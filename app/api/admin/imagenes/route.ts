import { NextRequest, NextResponse } from 'next/server'
import { validateSession, getOverrides, upsertOverride } from '@/lib/db'

function auth(req: NextRequest): boolean {
  return validateSession(req.cookies.get('admin_token')?.value ?? '')
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const seccion = req.nextUrl.searchParams.get('seccion') ?? undefined
  const data = getOverrides(seccion)
  return NextResponse.json({ overrides: data })
}

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Body inválido' }, { status: 400 })

  const { seccion, item_id, indice, url, tipo = 'url', nombre_orig } = body

  if (!seccion || !item_id || indice === undefined || !url) {
    return NextResponse.json({ error: 'Faltan campos requeridos: seccion, item_id, indice, url' }, { status: 400 })
  }

  const result = upsertOverride(seccion, item_id, Number(indice), url, tipo, nombre_orig)
  return NextResponse.json({ ok: true, override: result })
}