import { NextRequest, NextResponse } from 'next/server'
import { getOverride } from '@/lib/db'
import { imgPortada, imgGaleria } from '@/lib/imagenes'

/**
 * GET /api/imagenes?seccion=naturaleza&item_id=NAT001
 * Devuelve las URLs resueltas (con overrides de DB si existen)
 * para que los componentes client-side puedan mostrar las imágenes actualizadas.
 */
export async function GET(req: NextRequest) {
  const seccion = req.nextUrl.searchParams.get('seccion') ?? ''
  const itemId  = req.nextUrl.searchParams.get('item_id') ?? ''

  if (!seccion || !itemId) {
    return NextResponse.json({ error: 'Faltan seccion e item_id' }, { status: 400 })
  }

  const baseGaleria = imgGaleria(seccion, itemId)
  const basePortada = imgPortada(seccion, itemId)

  const base = baseGaleria.length > 0
    ? baseGaleria
    : [basePortada, basePortada, basePortada, basePortada, basePortada]

  try {
    const fotos = base.map((urlBase, indice) => {
      const override = getOverride(seccion, itemId, indice)
      return override?.url ?? urlBase
    })

    return NextResponse.json(
      { fotos },
      {
        headers: {
          // Sin caché — siempre fresco para reflejar cambios del admin
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    )
  } catch {
    // Si la DB falla, devuelve las URLs base sin override
    return NextResponse.json({ fotos: base })
  }
}