import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const DB_PATH = process.env.SQLITE_PATH
  ? path.resolve(process.env.SQLITE_PATH)
  : path.resolve('./data/admin.db')

// Crear carpeta si no existe
const dir = path.dirname(DB_PATH)
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

// Singleton — en Next.js el módulo se cachea entre requests
let _db: Database.Database | null = null

export function getDb(): Database.Database {
  if (_db) return _db
  _db = new Database(DB_PATH)
  _db.pragma('journal_mode = WAL')
  _db.pragma('foreign_keys = ON')
  initSchema(_db)
  return _db
}

// ── SCHEMA ────────────────────────────────────────────────
function initSchema(db: Database.Database) {
  db.exec(`
    -- Tabla principal: una fila por cada (seccion, id, indice_foto)
    -- indice = 0 → portada
    -- indice = 1..4 → galería
    CREATE TABLE IF NOT EXISTS imagenes_override (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      seccion     TEXT    NOT NULL,   -- 'naturaleza' | 'aventura' | 'gastronomia' | 'arte-cultura' | 'festividades'
      item_id     TEXT    NOT NULL,   -- 'NAT001', 'GAS003', etc.
      indice      INTEGER NOT NULL,   -- 0=portada, 1-4=galería
      url         TEXT    NOT NULL,   -- URL final (ruta local o URL externa)
      tipo        TEXT    NOT NULL DEFAULT 'local',  -- 'local' | 'url'
      nombre_orig TEXT,               -- nombre original del archivo subido
      creado_en   TEXT    NOT NULL DEFAULT (datetime('now')),
      UNIQUE(seccion, item_id, indice)
    );

    -- Tabla de sesiones admin (token simple)
    CREATE TABLE IF NOT EXISTS admin_sessions (
      token       TEXT PRIMARY KEY,
      creado_en   TEXT NOT NULL DEFAULT (datetime('now')),
      expira_en   TEXT NOT NULL
    );
  `)
}

// ── HELPERS ───────────────────────────────────────────────

export interface ImagenOverride {
  id: number
  seccion: string
  item_id: string
  indice: number
  url: string
  tipo: string
  nombre_orig: string | null
  creado_en: string
}

/** Obtiene todas las overrides (opcional: filtra por sección) */
export function getOverrides(seccion?: string): ImagenOverride[] {
  const db = getDb()
  if (seccion) {
    return db
      .prepare('SELECT * FROM imagenes_override WHERE seccion = ? ORDER BY item_id, indice')
      .all(seccion) as ImagenOverride[]
  }
  return db
    .prepare('SELECT * FROM imagenes_override ORDER BY seccion, item_id, indice')
    .all() as ImagenOverride[]
}

/** Obtiene una override concreta */
export function getOverride(seccion: string, itemId: string, indice: number): ImagenOverride | null {
  const db = getDb()
  return (db
    .prepare('SELECT * FROM imagenes_override WHERE seccion = ? AND item_id = ? AND indice = ?')
    .get(seccion, itemId, indice) as ImagenOverride) ?? null
}

/** Upsert: crea o reemplaza una override */
export function upsertOverride(
  seccion: string,
  itemId: string,
  indice: number,
  url: string,
  tipo: 'local' | 'url' = 'local',
  nombreOrig?: string
): ImagenOverride {
  const db = getDb()
  db.prepare(`
    INSERT INTO imagenes_override (seccion, item_id, indice, url, tipo, nombre_orig)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(seccion, item_id, indice) DO UPDATE SET
      url = excluded.url,
      tipo = excluded.tipo,
      nombre_orig = excluded.nombre_orig,
      creado_en = datetime('now')
  `).run(seccion, itemId, indice, url, tipo, nombreOrig ?? null)

  return getOverride(seccion, itemId, indice)!
}

/** Elimina una override (vuelve a usar Unsplash/local) */
export function deleteOverride(seccion: string, itemId: string, indice: number): boolean {
  const db = getDb()
  const info = db
    .prepare('DELETE FROM imagenes_override WHERE seccion = ? AND item_id = ? AND indice = ?')
    .run(seccion, itemId, indice)
  return info.changes > 0
}

/** Elimina todas las overrides de un item */
export function deleteItemOverrides(seccion: string, itemId: string): number {
  const db = getDb()
  const info = db
    .prepare('DELETE FROM imagenes_override WHERE seccion = ? AND item_id = ?')
    .run(seccion, itemId)
  return info.changes
}

// ── SESIONES ──────────────────────────────────────────────

import crypto from 'crypto'

export function createSession(): string {
  const db = getDb()
  const token = crypto.randomBytes(32).toString('hex')
  // Sesión válida 24 horas
  db.prepare(`
    INSERT INTO admin_sessions (token, expira_en)
    VALUES (?, datetime('now', '+24 hours'))
  `).run(token)
  return token
}

export function validateSession(token: string): boolean {
  if (!token) return false
  const db = getDb()
  const row = db
    .prepare("SELECT token FROM admin_sessions WHERE token = ? AND expira_en > datetime('now')")
    .get(token)
  return !!row
}

export function deleteSession(token: string): void {
  const db = getDb()
  db.prepare('DELETE FROM admin_sessions WHERE token = ?').run(token)
}

/** Limpia sesiones caducadas */
export function cleanSessions(): void {
  const db = getDb()
  db.prepare("DELETE FROM admin_sessions WHERE expira_en <= datetime('now')").run()
}