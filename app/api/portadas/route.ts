import { NextRequest, NextResponse } from 'next/server'
import { getOverride } from '@/lib/db'
import { imgPortada } from '@/lib/imagenes'

/**
 * GET /api/portadas?seccion=naturaleza&ids=NAT001,NAT005,NAT007
 *
 * Devuelve un mapa { [itemId]: urlPortada } resolviendo overrides de la DB.
 * Usado por las secciones de listado (cards) para mostrar la imagen
 * que el admin haya subido como portada (índice 0).
 *
 * Si una imagen tiene visible=0, devuelve cadena vacía '' para que
 * el componente muestre el placeholder.
 */
export async function GET(req: NextRequest) {
  const seccion = req.nextUrl.searchParams.get('seccion') ?? ''
  const idsParam = req.nextUrl.searchParams.get('ids') ?? ''

  if (!seccion || !idsParam) {
    return NextResponse.json({ error: 'Faltan seccion e ids' }, { status: 400 })
  }

  const ids = idsParam.split(',').map(s => s.trim()).filter(Boolean)
  const resultado: Record<string, string> = {}

  try {
    for (const id of ids) {
      const override = getOverride(seccion, id, 0)
      if (override) {
        // Si está oculta, devolver cadena vacía
        resultado[id] = override.visible === 0 ? '' : override.url
      } else {
        resultado[id] = imgPortada(seccion, id)
      }
    }
  } catch {
    // DB no disponible — devolver URLs base para todos
    for (const id of ids) {
      resultado[id] = imgPortada(seccion, id)
    }
  }

  return NextResponse.json(
    { portadas: resultado },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}