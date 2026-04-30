'use client'

import { useState, useEffect } from 'react'

interface Slide {
  imagen: string
  nombre: string
  categoria: string
}

interface Props {
  slides: Slide[]
  intervalo?: number // ms entre cambios (default: 3000)
}

export default function CarruselGastronomia({ slides, intervalo = 3000 }: Props) {
  const [indice, setIndice] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const id = setInterval(() => {
      setIndice((prev) => (prev + 1) % slides.length)
    }, intervalo)
    return () => clearInterval(id)
  }, [slides.length, intervalo])

  if (slides.length === 0) return null

  return (
    <div
      style={{
        borderRadius: '20px',
        overflow: 'hidden',
        position: 'relative',
        height: '100%',
        minHeight: '520px',
        boxShadow: '0 16px 48px rgba(var(--color-verde-oscuro-rgb), 0.15)',
        border: '1.5px solid var(--color-borde)',
        background: 'var(--color-verde-oscuro)',
      }}
    >
      {/* Capas de imágenes con cross-fade */}
      {slides.map((slide, i) => (
        <img
          key={i}
          src={slide.imagen}
          alt={slide.nombre}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: i === indice ? 1 : 0,
            transition: 'opacity 0.9s ease-in-out',
          }}
        />
      ))}

      {/* Overlay con nombre del plato actual */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background:
            'linear-gradient(to top, rgba(var(--color-verde-oscuro-rgb), 0.95) 0%, rgba(var(--color-verde-oscuro-rgb), 0.4) 55%, transparent 100%)',
          padding: '80px 28px 26px',
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(var(--color-verde-claro-rgb), 0.22)',
            color: 'var(--color-verde-claro)',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            padding: '5px 12px',
            borderRadius: '20px',
            marginBottom: '12px',
          }}
        >
          {slides[indice].categoria}
        </div>
        <div
          key={indice}
          style={{
            fontFamily: 'var(--font-titulo)',
            fontSize: '26px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '6px',
            lineHeight: 1.2,
            animation: 'gastroFadeUp 0.6s ease',
          }}
        >
          {slides[indice].nombre}
        </div>
        <div
          style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.72)',
            lineHeight: 1.7,
          }}
        >
          Tradición, ingredientes locales y recetas que hacen parte de la vida cotidiana.
        </div>
      </div>

      {/* Indicadores (puntos) */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '6px',
          zIndex: 2,
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Mostrar imagen ${i + 1}`}
            onClick={() => setIndice(i)}
            style={{
              width: i === indice ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === indice ? 'var(--color-verde-claro)' : 'rgba(255,255,255,0.55)',
              border: 'none',
              cursor: 'pointer',
              transition: 'width 0.3s ease, background 0.3s ease',
              padding: 0,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes gastroFadeUp {
          from { opacity: 0; transform: translateY(8px) }
          to   { opacity: 1; transform: translateY(0) }
        }
      `}</style>
    </div>
  )
}
