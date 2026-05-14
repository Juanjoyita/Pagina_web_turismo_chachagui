/**
 * lib/imagenesServer.ts
 * Resolución de imágenes con overrides de DB para Server Components.
 * Respeta el campo `visible`: imágenes con visible=0 se filtran del array.
 */

import { imgPortada as imgPortadaBase, imgGaleria as imgGaleriaBase } from './imagenes'

export async function resolverPortada(seccion: string, id: string): Promise<string> {
  try {
    const { getOverride } = await import('./db')
    const override = getOverride(seccion, id, 0)
    if (override) {
      if (override.visible === 0) return ''  // oculta
      return override.url
    }
  } catch { /* DB no disponible */ }
  return imgPortadaBase(seccion, id)
}

export async function resolverGaleria(seccion: string, id: string): Promise<string[]> {
  const base = imgGaleriaBase(seccion, id)
  try {
    const { getOverride } = await import('./db')
    const resultado = base
      .map((urlBase, indice) => {
        const override = getOverride(seccion, id, indice)
        if (override) {
          if (override.visible === 0) return null  // oculta → excluir
          return override.url
        }
        return urlBase
      })
      .filter((url): url is string => url !== null && url !== '')
    return resultado.length > 0 ? resultado : base
  } catch {
    return base
  }
}