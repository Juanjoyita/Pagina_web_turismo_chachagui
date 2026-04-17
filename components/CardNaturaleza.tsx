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
  emoji: string
}

export default function CardNaturaleza({ slug, nombre, tipo, descripcion, actividades, ubicacion, emoji }: Props) {
  const [hover, setHover] = useState(false)

  const tipoBadge: Record<string, string> = {
    reserva: 'Reserva natural',
    cascada: 'Cascada / Mirador',
    sendero: 'Sendero',
    finca:   'Finca cafetera',
  }

  return (
    <Link href={`/naturaleza/${slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: hover ? '#FFFFFF' : '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          borderTop: `1.5px solid ${hover ? '#CAD74B' : '#E8E8E8'}`,
          borderRight: `1.5px solid ${hover ? '#CAD74B' : '#E8E8E8'}`,
          borderBottom: `1.5px solid ${hover ? '#CAD74B' : '#E8E8E8'}`,
          borderLeft: `5px solid ${hover ? '#CAD74B' : '#1C2316'}`,
          transition: 'all 0.28s ease',
          transform: hover ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: hover ? '0 20px 48px rgba(28,35,22,0.12)' : '0 2px 12px rgba(28,35,22,0.05)',
          cursor: 'pointer',
          height: '100%',
          display: 'flex', flexDirection: 'column', gap: '12px',
        }}
      >
        {/* Emoji + badge tipo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '14px',
            background: hover ? 'rgba(202,215,75,0.15)' : '#F1F1F1',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '26px', transition: 'all 0.28s',
            transform: hover ? 'scale(1.1)' : 'scale(1)',
          }}>
            {emoji}
          </div>
          <span style={{
            background: hover ? 'rgba(202,215,75,0.15)' : '#F1F1F1',
            color: hover ? '#1C2316' : '#555555',
            fontSize: '10px', fontWeight: 700,
            letterSpacing: '1px', textTransform: 'uppercase',
            padding: '4px 10px', borderRadius: '20px',
            transition: 'all 0.2s',
          }}>
            {tipoBadge[tipo] || tipo}
          </span>
        </div>

        {/* Nombre */}
        <h3 style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: '17px', fontWeight: 700,
          color: hover ? '#1C2316' : '#1C2316',
          margin: 0, lineHeight: 1.2,
        }}>
          {nombre}
        </h3>

        {/* Descripción */}
        <p style={{
          fontSize: '13px', color: 'rgba(28,35,22,0.6)',
          lineHeight: 1.7, margin: 0, flex: 1, fontWeight: 300,
        }}>
          {descripcion.length > 120 ? descripcion.slice(0, 120) + '…' : descripcion}
        </p>

        {/* Ubicación */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          fontSize: '12px', color: 'rgba(28,35,22,0.45)',
        }}>
          <span>📍</span>
          <span>{ubicacion}</span>
        </div>

        {/* Actividades + flecha */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginTop: '4px',
          paddingTop: '12px', borderTop: '1px solid #F1F1F1',
        }}>
          <span style={{
            fontSize: '11px', color: '#1C2316',
            fontWeight: 600, opacity: 0.6,
          }}>
            {actividades}
          </span>
          <div style={{
            width: '30px', height: '30px', borderRadius: '50%',
            background: hover ? '#CAD74B' : '#F1F1F1',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', color: '#1C2316',
            transition: 'all 0.25s',
            transform: hover ? 'translateX(4px)' : 'translateX(0)',
          }}>
            →
          </div>
        </div>
      </div>
    </Link>
  )
}