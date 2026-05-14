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

  // Tras 250 ms de hover sostenido, revela la imagen y oculta el texto
  useEffect(() => {
    if (hover && imagen) {
      timerRef.current = setTimeout(() => setMostrarImagen(true), 250)
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
          borderTop:    `1px solid ${hover ? 'rgba(var(--color-verde-claro-rgb), 0.3)' : 'rgba(255,255,255,0.08)'}`,
          borderRight:  `1px solid ${hover ? 'rgba(var(--color-verde-claro-rgb), 0.3)' : 'rgba(255,255,255,0.08)'}`,
          borderBottom: `1px solid ${hover ? 'rgba(var(--color-verde-claro-rgb), 0.3)' : 'rgba(255,255,255,0.08)'}`,
          borderLeft:   '4px solid var(--color-verde-claro)',
          borderRadius: '16px',
          padding: '28px 24px',
          height: '100%',
          minHeight: '260px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          cursor: 'pointer',
          transition: 'all 0.28s ease',
          transform: hover ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: hover ? '0 20px 48px rgba(0,0,0,0.3)' : 'none',
          overflow: 'hidden',
          isolation: 'isolate',
        }}
      >
        {/* Imagen de fondo revelada en hover */}
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
                transition: 'opacity 0.45s ease, transform 0.9s ease',
                zIndex: -2,
              }}
            />
            {/* Velo oscuro suave para que el tag se siga leyendo encima de la foto */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(var(--color-verde-oscuro-rgb), 0.10) 0%, rgba(var(--color-verde-oscuro-rgb), 0.40) 100%)',
                opacity: mostrarImagen ? 1 : 0,
                transition: 'opacity 0.45s ease',
                zIndex: -1,
              }}
            />
          </>
        )}

        {/* Encabezado: emoji + tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          {/* Emoji — se desvanece en hover */}
          <span
            style={{
              fontSize: '28px',
              background: 'rgba(var(--color-verde-claro-rgb), 0.2)',
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: mostrarImagen ? 0 : 1,
              transform: mostrarImagen ? 'scale(0.85)' : 'scale(1)',
              transition: 'opacity 0.35s ease, transform 0.4s ease',
            }}
          >
            {emoji}
          </span>

          {/* Tag — siempre visible, queda solo cuando aparece la imagen */}
          <span
            style={{
              background: mostrarImagen
                ? 'var(--color-verde-claro)'
                : 'rgba(var(--color-verde-claro-rgb), 0.12)',
              color: mostrarImagen
                ? 'var(--color-verde-oscuro)'
                : 'var(--color-verde-claro)',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '6px 14px',
              borderRadius: '20px',
              border: '1px solid rgba(var(--color-verde-claro-rgb), 0.35)',
              boxShadow: mostrarImagen
                ? '0 6px 18px rgba(var(--color-verde-claro-rgb), 0.45)'
                : 'none',
              backdropFilter: mostrarImagen ? 'blur(6px)' : 'none',
              transition: 'all 0.4s ease',
              alignSelf: 'flex-start',
              flexShrink: 0,
            }}
          >
            {tag}
          </span>
        </div>

        {/* Título — desaparece en hover */}
        <h3
          style={{
            fontFamily: 'var(--font-titulo)',
            fontSize: '20px',
            fontWeight: 700,
            color: hover ? 'var(--color-verde-claro)' : '#FFFFFF',
            margin: 0,
            opacity: mostrarImagen ? 0 : 1,
            transform: mostrarImagen ? 'translateY(-6px)' : 'translateY(0)',
            transition: 'opacity 0.3s ease, transform 0.4s ease, color 0.2s ease',
          }}
        >
          {actividad}
        </h3>

        {/* Descripción — desaparece en hover */}
        <p
          style={{
            fontSize: '13px',
            color: 'rgba(var(--color-crema-rgb), 0.55)',
            lineHeight: 1.7,
            margin: 0,
            flex: 1,
            fontWeight: 300,
            opacity: mostrarImagen ? 0 : 1,
            transform: mostrarImagen ? 'translateY(-6px)' : 'translateY(0)',
            transition: 'opacity 0.3s ease, transform 0.4s ease',
          }}
        >
          {descripcionCorta}
        </p>

        {/* Pie "Ver más" — desaparece en hover */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '8px',
            opacity: mostrarImagen ? 0 : 1,
            transition: 'opacity 0.3s ease',
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
              background: 'rgba(var(--color-verde-claro-rgb), 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              color: 'var(--color-verde-claro)',
              transform: hover ? 'translateX(4px)' : 'translateX(0)',
              transition: 'transform 0.25s ease',
            }}
          >
            →
          </div>
        </div>
      </div>
    </Link>
  )
}
