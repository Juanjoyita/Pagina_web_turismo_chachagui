'use client'

import { useState, useEffect, useCallback } from 'react'

interface Props {
  imagenes: string[]
  nombre: string
  categoria: string
  tipo: string
}

/**
 * Carrusel auto-rotativo (cada 2 s) con click para abrir el lightbox ampliado.
 * Reemplaza la galería de "1 portada + 4 miniaturas" por un solo visor grande.
 */
export default function GaleriaNaturaleza({ imagenes, nombre, categoria, tipo }: Props) {
  const [indice, setIndice] = useState(0)
  const [abierto, setAbierto] = useState(false)
  const [enHover, setEnHover] = useState(false)

  /* ---------- Auto-rotación cada 2 s ---------- */
  useEffect(() => {
    if (imagenes.length <= 1) return
    if (abierto || enHover) return // pausa si está ampliada o si el cursor está encima
    const id = setInterval(() => {
      setIndice((prev) => (prev + 1) % imagenes.length)
    }, 2000)
    return () => clearInterval(id)
  }, [imagenes.length, abierto, enHover])

  /* ---------- Navegación manual ---------- */
  const cerrar = useCallback(() => setAbierto(false), [])
  const anterior = useCallback(
    () => setIndice((p) => (p - 1 + imagenes.length) % imagenes.length),
    [imagenes.length]
  )
  const siguiente = useCallback(
    () => setIndice((p) => (p + 1) % imagenes.length),
    [imagenes.length]
  )

  /* ---------- Atajos de teclado dentro del lightbox ---------- */
  useEffect(() => {
    if (!abierto) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cerrar()
      else if (e.key === 'ArrowLeft') anterior()
      else if (e.key === 'ArrowRight') siguiente()
    }
    window.addEventListener('keydown', onKey)
    const overflowAnterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflowAnterior
    }
  }, [abierto, cerrar, anterior, siguiente])

  if (imagenes.length === 0) return null

  return (
    <>
      {/* ============================================================
          CARRUSEL grande con cross-fade entre imágenes
          ============================================================ */}
      <div
        onMouseEnter={() => setEnHover(true)}
        onMouseLeave={() => setEnHover(false)}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/10',
          borderRadius: '20px',
          overflow: 'hidden',
          marginBottom: '52px',
          background: 'var(--color-verde-oscuro)',
          boxShadow:
            '0 24px 56px rgba(var(--color-verde-oscuro-rgb), 0.22), 0 0 0 1px var(--color-borde)',
        }}
      >
        {/* Capas de imágenes con fade */}
        {imagenes.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setAbierto(true)}
            aria-label={`Ver ${nombre} en pantalla completa (imagen ${i + 1} de ${imagenes.length})`}
            style={{
              position: 'absolute',
              inset: 0,
              border: 'none',
              padding: 0,
              background: 'transparent',
              cursor: 'zoom-in',
              opacity: i === indice ? 1 : 0,
              transition: 'opacity 0.9s ease',
              zIndex: i === indice ? 1 : 0,
            }}
          >
            <img
              src={img}
              alt={`${nombre} (${i + 1}/${imagenes.length})`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </button>
        ))}

        {/* Etiqueta categoría · tipo */}
        <span
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            zIndex: 3,
            background: 'rgba(var(--color-verde-oscuro-rgb), 0.85)',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            padding: '8px 16px',
            borderRadius: '30px',
            backdropFilter: 'blur(6px)',
            pointerEvents: 'none',
          }}
        >
          {categoria}{tipo ? ` · ${tipo}` : ''}
        </span>

        {/* Indicador "Ampliar" */}
        <span
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 3,
            background: 'rgba(var(--color-verde-oscuro-rgb), 0.75)',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 600,
            padding: '6px 12px',
            borderRadius: '20px',
            backdropFilter: 'blur(6px)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            pointerEvents: 'none',
          }}
        >
          ⤢ Ampliar
        </span>

        {/* Botones anterior / siguiente */}
        {imagenes.length > 1 && (
          <>
            <button
              type="button"
              onClick={anterior}
              aria-label="Imagen anterior"
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 3,
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,0.35)',
                background: 'rgba(var(--color-verde-oscuro-rgb), 0.55)',
                color: '#FFFFFF',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(6px)',
              }}
            >
              ←
            </button>
            <button
              type="button"
              onClick={siguiente}
              aria-label="Imagen siguiente"
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 3,
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,0.35)',
                background: 'rgba(var(--color-verde-oscuro-rgb), 0.55)',
                color: '#FFFFFF',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(6px)',
              }}
            >
              →
            </button>
          </>
        )}

        {/* Indicadores (puntos) */}
        {imagenes.length > 1 && (
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              zIndex: 3,
              display: 'flex',
              gap: '6px',
            }}
          >
            {imagenes.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ir a la imagen ${i + 1}`}
                onClick={() => setIndice(i)}
                style={{
                  width: i === indice ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  background:
                    i === indice
                      ? 'var(--color-verde-claro)'
                      : 'rgba(255,255,255,0.55)',
                  transition: 'width 0.3s ease, background 0.3s ease',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ============================================================
          LIGHTBOX (al hacer click en la imagen del carrusel)
          ============================================================ */}
      {abierto && (
        <div
          onClick={cerrar}
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen ampliada de ${nombre}`}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(10,12,8,0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 24px',
            animation: 'galeriaFadeIn 0.25s ease',
          }}
        >
          <img
            src={imagenes[indice]}
            alt={`${nombre} (${indice + 1}/${imagenes.length})`}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              borderRadius: '12px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
              cursor: 'default',
            }}
          />

          {/* Botón cerrar */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); cerrar() }}
            aria-label="Cerrar galería"
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '1.5px solid rgba(255,255,255,0.25)',
              background: 'rgba(255,255,255,0.08)',
              color: '#FFFFFF',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(6px)',
            }}
          >
            ✕
          </button>

          {/* Anterior / Siguiente dentro del lightbox */}
          {imagenes.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); anterior() }}
                aria-label="Imagen anterior"
                style={{
                  position: 'absolute',
                  left: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  background: 'rgba(255,255,255,0.08)',
                  color: '#FFFFFF',
                  fontSize: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(6px)',
                }}
              >
                ←
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); siguiente() }}
                aria-label="Imagen siguiente"
                style={{
                  position: 'absolute',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  background: 'rgba(255,255,255,0.08)',
                  color: '#FFFFFF',
                  fontSize: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(6px)',
                }}
              >
                →
              </button>
            </>
          )}

          {/* Contador */}
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              background: 'rgba(255,255,255,0.06)',
              padding: '6px 14px',
              borderRadius: '20px',
              backdropFilter: 'blur(6px)',
            }}
          >
            {indice + 1} / {imagenes.length}
          </div>

          <style>{`
            @keyframes galeriaFadeIn {
              from { opacity: 0 }
              to   { opacity: 1 }
            }
          `}</style>
        </div>
      )}
    </>
  )
}
