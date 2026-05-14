import { NextRequest, NextResponse } from 'next/server'
import { validateSession, getOverride } from '@/lib/db'
import { imgPortada, imgGaleria } from '@/lib/imagenes'

function auth(req: NextRequest): boolean {
  return validateSession(req.cookies.get('admin_token')?.value ?? '')
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const seccion = req.nextUrl.searchParams.get('seccion') ?? ''
  const itemId  = req.nextUrl.searchParams.get('item_id') ?? ''

  if (!seccion || !itemId) {
    return NextResponse.json({ error: 'Faltan seccion e item_id' }, { status: 400 })
  }

  // URLs base del sistema (Unsplash o local según USAR_FOTOS_LOCALES)
  const baseGaleria = imgGaleria(seccion, itemId)  // [portada, g1, g2, g3, g4]
  const basePortada = imgPortada(seccion, itemId)

  // Si imgGaleria devuelve array vacío usar portada como fallback
  const base = baseGaleria.length > 0
    ? baseGaleria
    : [basePortada, basePortada, basePortada, basePortada, basePortada]

  // Para cada índice ver si hay override en DB
  const fotos = base.map((urlBase, indice) => {
    const override = getOverride(seccion, itemId, indice)
    return {
      indice,
      urlBase,
      urlActual: override?.url ?? urlBase,
      overrideId: override?.id ?? null,
      tieneOverride: !!override,
      nombreOrig: override?.nombre_orig ?? null,
    }
  })

  return NextResponse.json({ fotos })
}