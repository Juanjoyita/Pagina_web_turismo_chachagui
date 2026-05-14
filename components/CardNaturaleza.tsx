'use client'

import Link from 'next/link'
import { useState } from 'react'

interface Props {
  slug: string
  nombre: string
  tipo: string
  descripcion: string
  actividades: string
  ubicacion: string
  imagen: string
  categoria: string
}

export default function CardNaturaleza({ slug, nombre, tipo, descripcion, actividades, ubicacion, imagen, categoria }: Props) {
  const [hover, setHover] = useState(false)

  // El badge muestra la categoría directamente (Reserva, Cascada, Sendero, Mirador, Finca)
  // con un label más descriptivo cuando aplica
  const tipoBadge: Record<string, string> = {
    Reserva: 'Reserva natural',
    Cascada: 'Cascada',
    Sendero: 'Sendero',
    Mirador: 'Mirador',
    Finca:   'Finca cafetera',
  }

  return (
    <Link href={`/naturaleza/${slug}`} style={{ textDecoration: 'none', display: 'flex', height: '100%' }}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: 'relative',
          background: '#FFFFFF',
          borderRadius: '16px',
          overflow: 'hidden',
          clipPath: 'inset(0 round 16px)',
          isolation: 'isolate',
          willChange: 'transform',
          border: `1.5px solid ${hover ? 'var(--color-verde-claro)' : 'rgba(var(--color-verde-oscuro-rgb), 0.12)'}`,
          transition: 'transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease',
          transform: hover ? 'translate3d(0, -6px, 0)' : 'translate3d(0, 0, 0)',
          boxShadow: hover
            ? '0 24px 48px rgba(var(--color-verde-oscuro-rgb), 0.20), 0 4px 12px rgba(var(--color-verde-oscuro-rgb), 0.08)'
            : '0 8px 22px rgba(var(--color-verde-oscuro-rgb), 0.10), 0 2px 6px rgba(var(--color-verde-oscuro-rgb), 0.06)',
          cursor: 'pointer',
          width: '100%',
          display: 'flex', flexDirection: 'column',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
        }}
      >
        {/* Franja vertical izquierda (acento) */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: '5px',
            background: hover ? 'var(--color-verde-claro)' : 'var(--color-verde-oscuro)',
            transition: 'background 0.28s ease',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
        {/* Imagen real */}
        <div style={{
          width: '100%', aspectRatio: '4/3',
          position: 'relative', overflow: 'hidden',
          background: 'var(--color-verde-oscuro)',
          isolation: 'isolate',
          transform: 'translateZ(0)',
        }}>
          <img
            src={imagen}
            alt={nombre}
            loading="lazy"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', display: 'block',
              transform: hover ? 'scale3d(1.08, 1.08, 1)' : 'scale3d(1, 1, 1)',
              transition: 'transform 0.5s ease',
              willChange: 'transform',
            }}
          />
          <span style={{
            position: 'absolute', top: '12px', right: '12px',
            background: hover ? 'var(--color-verde-claro)' : 'rgba(var(--color-verde-oscuro-rgb), 0.85)',
            color: hover ? 'var(--color-verde-oscuro)' : '#FFFFFF',
            fontSize: '10px', fontWeight: 700,
            letterSpacing: '1px', textTransform: 'uppercase',
            padding: '4px 10px', borderRadius: '20px',
            transition: 'all 0.2s',
            backdropFilter: 'blur(4px)',
          }}>
            {tipoBadge[categoria] || categoria}
          </span>
        </div>

        {/* Contenido */}
        <div style={{
          padding: '20px 24px 22px',
          display: 'flex', flexDirection: 'column', gap: '12px', flex: 1,
        }}>
          <h3 style={{
            fontFamily: 'var(--font-titulo)',
            fontSize: '17px', fontWeight: 700,
            color: 'var(--color-verde-oscuro)',
            margin: 0, lineHeight: 1.2,
          }}>
            {nombre}
          </h3>

          <p style={{
            fontSize: '13px', color: 'rgba(var(--color-verde-oscuro-rgb), 0.6)',
            lineHeight: 1.7, margin: 0, flex: 1, fontWeight: 300,
          }}>
            {descripcion.length > 120 ? descripcion.slice(0, 120) + '…' : descripcion}
          </p>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            fontSize: '12px', color: 'rgba(var(--color-verde-oscuro-rgb), 0.45)',
          }}>
            <span>📍</span>
            <span>{ubicacion}</span>
          </div>

          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', marginTop: '4px',
            paddingTop: '12px', borderTop: '1px solid rgba(var(--color-verde-oscuro-rgb), 0.10)',
          }}>
            <span style={{
              fontSize: '11px', color: 'var(--color-verde-oscuro)',
              fontWeight: 600, opacity: 0.6,
            }}>
              {actividades}
            </span>
            <div style={{
              width: '30px', height: '30px', borderRadius: '50%',
              background: hover ? 'var(--color-verde-claro)' : 'var(--color-fondo)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', color: 'var(--color-verde-oscuro)',
              transition: 'all 0.25s',
              transform: hover ? 'translateX(4px)' : 'translateX(0)',
            }}>
              →
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
