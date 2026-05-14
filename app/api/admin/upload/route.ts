import { NextRequest, NextResponse } from 'next/server'
import { validateSession, upsertOverride } from '@/lib/db'
import fs from 'fs'
import path from 'path'

function auth(req: NextRequest): boolean {
  return validateSession(req.cookies.get('admin_token')?.value ?? '')
}

const SECCIONES_VALIDAS = [
  'naturaleza', 'aventura', 'gastronomia',
  'arte-cultura', 'festividades', 'hero',
]

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const formData = await req.formData().catch(() => null)
  if (!formData) return NextResponse.json({ error: 'FormData inválido' }, { status: 400 })

  const file = formData.get('file') as File | null
  const seccion = formData.get('seccion') as string | null
  const itemId = formData.get('item_id') as string | null
  const indiceStr = formData.get('indice') as string | null

  if (!file || !seccion || !itemId || indiceStr === null) {
    return NextResponse.json({ error: 'Faltan campos: file, seccion, item_id, indice' }, { status: 400 })
  }

  if (!SECCIONES_VALIDAS.includes(seccion)) {
    return NextResponse.json({ error: `Sección inválida: ${seccion}` }, { status: 400 })
  }

  const indice = Number(indiceStr)
  if (isNaN(indice) || indice < 0 || indice > 4) {
    return NextResponse.json({ error: 'Índice debe ser 0-4' }, { status: 400 })
  }

  // Generar nombre de archivo
  const ext = getExtension(file.name) || 'jpg'
  const sufijo = indice === 0 ? 'portada' : String(indice).padStart(2, '0')
  const nombreArchivo = `${itemId.toLowerCase()}-${sufijo}.${ext}`

  // Directorio destino dentro de /public/imagenes/{seccion}/
  const dirDestino = path.resolve('./public/imagenes', seccion)
  if (!fs.existsSync(dirDestino)) {
    fs.mkdirSync(dirDestino, { recursive: true })
  }
  const rutaFinal = path.join(dirDestino, nombreArchivo)

  // Guardar archivo
  const buffer = Buffer.from(await file.arrayBuffer())
  fs.writeFileSync(rutaFinal, buffer)

  // URL pública
  const urlPublica = `/imagenes/${seccion}/${nombreArchivo}`

  // Registrar override en DB
  const override = upsertOverride(seccion, itemId, indice, urlPublica, 'local', file.name)

  return NextResponse.json({
    ok: true,
    url: urlPublica,
    override,
  })
}

function getExtension(filename: string): string {
  const parts = filename.split('.')
  if (parts.length < 2) return 'jpg'
  const ext = parts[parts.length - 1].toLowerCase()
  // Solo permitir imágenes
  if (['jpg', 'jpeg', 'png', 'webp', 'avif'].includes(ext)) return ext
  return 'jpg'
}

// Aumentar el límite de tamaño de body para archivos grandes
export const config = {
  api: {
    bodyParser: false,
  },
}