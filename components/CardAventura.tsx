'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

interface Props {
  slug: string
  actividad: string
  descripcionCorta: string
  emoji: string
  tag: string
  imagen?: string
}

export default function CardAventura({
  slug,
  actividad,
  descripcionCorta,
  emoji,
  tag,
  imagen,
}: Props) {
  const [hover, setHover] = useState(false)
  const [mostrarImagen, setMostrarImagen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Tras 450 ms de hover sostenido, revela la imagen
  useEffect(() => {
    if (hover && imagen) {
      timerRef.current = setTimeout(() => setMostrarImagen(true), 450)
    } else {
      if (timerRef.current) clearTimeout(timerRef.current)
      setMostrarImagen(false)
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [hover, imagen])

  return (
    <Link
      href={`/aventura/${slug}`}
      style={{ textDecoration: 'none', display: 'block', height: '100%' }}
    >
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: 'relative',
          background: hover ? 'rgba(var(--color-verde-claro-rgb), 0.06)' : 'rgba(255,255,255,0.04)',
          borderTop: `1px solid ${hover ? 'rgba(var(--color-verde-claro-rgb), 0.3)' : 'rgba(255,255,255,0.08)'}`,
          borderRight: `1px solid ${hover ? 'rgba(var(--color-verde-claro-rgb), 0.3)' : 'rgba(255,255,255,0.08)'}`,
          borderBottom: `1px solid ${hover ? 'rgba(var(--color-verde-claro-rgb), 0.3)' : 'rgba(255,255,255,0.08)'}`,
          borderLeft: '4px solid var(--color-verde-claro)',
          borderRadius: '16px',
          padding: '28px 24px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          cursor: 'pointer',
          transition: 'all 0.28s',
          transform: hover ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: hover ? '0 20px 48px rgba(0,0,0,0.3)' : 'none',
          overflow: 'hidden',
          isolation: 'isolate',
        }}
      >
        {/* Imagen de fondo revelada tras hover sostenido */}
        {imagen && (
          <>
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${imagen})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: mostrarImagen ? 1 : 0,
                transform: mostrarImagen ? 'scale(1)' : 'scale(1.08)',
                transition: 'opacity 0.55s ease, transform 0.9s ease',
                zIndex: -2,
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(var(--color-verde-oscuro-rgb), 0.72) 0%, rgba(var(--color-verde-oscuro-rgb), 0.86) 60%, rgba(var(--color-verde-oscuro-rgb), 0.95) 100%)',
                opacity: mostrarImagen ? 1 : 0,
                transition: 'opacity 0.55s ease',
                zIndex: -1,
              }}
            />
          </>
        )}

        {/* Emoji + tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontSize: '28px',
              background: mostrarImagen
                ? 'rgba(var(--color-verde-claro-rgb), 0.35)'
                : 'rgba(var(--color-verde-claro-rgb), 0.2)',
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: mostrarImagen ? 'blur(6px)' : 'none',
              transition: 'background 0.4s ease',
            }}
          >
            {emoji}
          </span>
          <span
            style={{
              background: mostrarImagen
                ? 'rgba(var(--color-verde-oscuro-rgb), 0.55)'
                : 'rgba(var(--color-verde-claro-rgb), 0.12)',
              color: 'var(--color-verde-claro)',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              padding: '4px 12px',
              borderRadius: '20px',
              border: '1px solid rgba(var(--color-verde-claro-rgb), 0.2)',
              backdropFilter: mostrarImagen ? 'blur(6px)' : 'none',
              transition: 'background 0.4s ease',
            }}
          >
            {tag}
          </span>
        </div>

        {/* Título */}
        <h3
          style={{
            fontFamily: 'var(--font-titulo)',
            fontSize: '20px',
            fontWeight: 700,
            color: hover ? 'var(--color-verde-claro)' : '#FFFFFF',
            margin: 0,
            transition: 'color 0.2s',
            textShadow: mostrarImagen ? '0 2px 12px rgba(0,0,0,0.55)' : 'none',
          }}
        >
          {actividad}
        </h3>

        {/* Descripción */}
        <p
          style={{
            fontSize: '13px',
            color: mostrarImagen
              ? 'rgba(var(--color-crema-rgb), 0.85)'
              : 'rgba(var(--color-crema-rgb), 0.5)',
            lineHeight: 1.7,
            margin: 0,
            flex: 1,
            fontWeight: 300,
            transition: 'color 0.4s ease',
            textShadow: mostrarImagen ? '0 1px 6px rgba(0,0,0,0.55)' : 'none',
          }}
        >
          {descripcionCorta}
        </p>

        {/* Ver más */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '8px',
          }}
        >
          <span style={{ fontSize: '12px', color: 'var(--color-verde-claro)', fontWeight: 700 }}>
            Ver más
          </span>
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: mostrarImagen
                ? 'rgba(var(--color-verde-claro-rgb), 0.28)'
                : 'rgba(var(--color-verde-claro-rgb), 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              color: 'var(--color-verde-claro)',
              transition: 'transform 0.25s, background 0.4s ease',
              transform: hover ? 'translateX(4px)' : 'translateX(0)',
              backdropFilter: mostrarImagen ? 'blur(6px)' : 'none',
            }}
          >
            →
          </div>
        </div>
      </div>
    </Link>
  )
}
