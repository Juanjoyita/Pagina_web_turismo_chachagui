'use client'

import { useState, useEffect, useCallback } from 'react'

interface Props {
  imagenes: string[]
  nombre: string
  categoria: string
  tipo: string
}

export default function GaleriaNaturaleza({ imagenes, nombre, categoria, tipo }: Props) {
  const [abierto, setAbierto] = useState(false)
  const [indice, setIndice] = useState(0)

  const portada = imagenes[0]
  const secundarias = imagenes.slice(1)

  const abrir = (i: number) => {
    setIndice(i)
    setAbierto(true)
  }

  const cerrar = useCallback(() => setAbierto(false), [])
  const anterior = useCallback(
    () => setIndice((p) => (p - 1 + imagenes.length) % imagenes.length),
    [imagenes.length]
  )
  const siguiente = useCallback(
    () => setIndice((p) => (p + 1) % imagenes.length),
    [imagenes.length]
  )

  // Teclado: Esc cierra, ← → navegan
  useEffect(() => {
    if (!abierto) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cerrar()
      else if (e.key === 'ArrowLeft') anterior()
      else if (e.key === 'ArrowRight') siguiente()
    }
    window.addEventListener('keydown', onKey)
    // Bloquea el scroll del body mientras el lightbox está abierto
    const overflowAnterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflowAnterior
    }
  }, [abierto, cerrar, anterior, siguiente])

  return (
    <>
      {/* Imagen principal grande */}
      <button
        type="button"
        onClick={() => abrir(0)}
        style={{
          width: '100%', aspectRatio: '16/9',
          borderRadius: '20px', marginBottom: '24px',
          boxShadow: '0 16px 48px rgba(var(--color-verde-oscuro-rgb), 0.15)',
          position: 'relative', overflow: 'hidden',
          background: 'var(--color-verde-oscuro)',
          border: 'none', padding: 0, cursor: 'zoom-in',
          display: 'block',
        }}
        aria-label={`Ver ${nombre} en pantalla completa`}
      >
        <img
          src={portada}
          alt={nombre}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', display: 'block',
            transition: 'transform 0.4s ease',
          }}
        />
        <span style={{
          position: 'absolute', bottom: '20px', left: '20px',
          background: 'rgba(var(--color-verde-oscuro-rgb), 0.85)',
          color: '#FFFFFF',
          fontSize: '11px', fontWeight: 700,
          letterSpacing: '2px', textTransform: 'uppercase',
          padding: '8px 16px', borderRadius: '30px',
          backdropFilter: 'blur(6px)',
        }}>
          {categoria} · {tipo}
        </span>
        <span style={{
          position: 'absolute', top: '16px', right: '16px',
          background: 'rgba(var(--color-verde-oscuro-rgb), 0.75)',
          color: '#FFFFFF',
          fontSize: '11px', fontWeight: 600,
          padding: '6px 12px', borderRadius: '20px',
          backdropFilter: 'blur(6px)',
          display: 'inline-flex', alignItems: 'center', gap: '6px',
        }}>
          ⤢ Ampliar
        </span>
      </button>

      {/* Miniaturas secundarias */}
      {secundarias.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(secundarias.length, 3)}, 1fr)`,
          gap: '14px',
          marginBottom: '52px',
        }}>
          {secundarias.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => abrir(i + 1)}
              style={{
                aspectRatio: '4/3',
                borderRadius: '14px',
                overflow: 'hidden',
                background: 'var(--color-verde-oscuro)',
                boxShadow: '0 6px 20px rgba(var(--color-verde-oscuro-rgb), 0.10)',
                border: 'none', padding: 0, cursor: 'zoom-in',
                display: 'block', position: 'relative',
              }}
              aria-label={`Ver imagen ${i + 2} en pantalla completa`}
            >
              <img
                src={img}
                alt={`${nombre} - imagen ${i + 2}`}
                loading="lazy"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', display: 'block',
                }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {abierto && (
        <div
          onClick={cerrar}
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen ampliada de ${nombre}`}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(10,12,8,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '60px 24px',
            animation: 'galeriaFadeIn 0.25s ease',
          }}
        >
          {/* Imagen grande */}
          <img
            src={imagenes[indice]}
            alt={`${nombre} (${indice + 1}/${imagenes.length})`}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '100%', maxHeight: '100%',
              objectFit: 'contain',
              borderRadius: '12px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
              cursor: 'default',
            }}
          />

          {/* Cerrar */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); cerrar() }}
            aria-label="Cerrar galería"
            style={{
              position: 'absolute', top: '20px', right: '20px',
              width: '44px', height: '44px', borderRadius: '50%',
              border: '1.5px solid rgba(255,255,255,0.25)',
              background: 'rgba(255,255,255,0.08)',
              color: '#FFFFFF', fontSize: '18px',
              cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(6px)',
            }}
          >
            ✕
          </button>

          {/* Anterior / Siguiente (si hay más de una) */}
          {imagenes.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); anterior() }}
                aria-label="Imagen anterior"
                style={{
                  position: 'absolute',
                  left: '20px', top: '50%', transform: 'translateY(-50%)',
                  width: '48px', height: '48px', borderRadius: '50%',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  background: 'rgba(255,255,255,0.08)',
                  color: '#FFFFFF', fontSize: '20px',
                  cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
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
                  right: '20px', top: '50%', transform: 'translateY(-50%)',
                  width: '48px', height: '48px', borderRadius: '50%',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  background: 'rgba(255,255,255,0.08)',
                  color: '#FFFFFF', fontSize: '20px',
                  cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  backdropFilter: 'blur(6px)',
                }}
              >
                →
              </button>
            </>
          )}

          {/* Contador */}
          <div style={{
            position: 'absolute', bottom: '24px', left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '12px', fontWeight: 600,
            letterSpacing: '2px', textTransform: 'uppercase',
            background: 'rgba(255,255,255,0.06)',
            padding: '6px 14px', borderRadius: '20px',
            backdropFilter: 'blur(6px)',
          }}>
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
