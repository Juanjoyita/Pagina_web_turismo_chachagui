import { getOverride } from './db'
import { imgPortada as imgPortadaBase, imgGaleria as imgGaleriaBase } from './imagenes'

/** Portada con override de DB */
export function imgPortadaAdmin(seccion: string, id: string): string {
  try {
    const override = getOverride(seccion, id, 0)
    if (override?.url) return override.url
  } catch {
    // Si la DB no está disponible (ej. build estático) usa el fallback
  }
  return imgPortadaBase(seccion, id)
}

/** Galería completa (5 fotos) con overrides de DB */
export function imgGaleriaAdmin(seccion: string, id: string): string[] {
  const base = imgGaleriaBase(seccion, id)
  try {
    return base.map((url, indice) => {
      const override = getOverride(seccion, id, indice)
      return override?.url ?? url
    })
  } catch {
    return base
  }
}