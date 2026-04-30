'use client'

import Link from 'next/link'
import { useState } from 'react'

interface Props {
  id: string
  nombre: string
  descripcion: string
  emoji: string
  badge: string
  extra?: string
  href?: string
  color?: string
  colorClaro?: string
}

export default function TarjetaArte({
  id, nombre, descripcion, emoji, extra, href,
  color = 'var(--color-verde-claro)',
  colorClaro = 'rgba(var(--color-verde-claro-rgb), 0.1)',
}: Props) {
  const [hover, setHover] = useState(false)
  const destino = href || `/arte/${id}`

  return (
    <Link href={destino} style={{ textDecoration: 'none', display: 'flex' }}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: hover ? '#FFFFFF' : '#FFFFFF',
          borderRadius: '20px',
          padding: '28px 24px',
          borderTop: `1.5px solid ${hover ? color : 'var(--color-borde)'}`,
          borderRight: `1.5px solid ${hover ? color : 'var(--color-borde)'}`,
          borderBottom: `1.5px solid ${hover ? color : 'var(--color-borde)'}`,
          borderLeft: `5px solid ${color}`,
          transition: 'all 0.28s ease',
          transform: hover ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: hover ? `0 20px 48px rgba(var(--color-verde-oscuro-rgb), 0.12)` : '0 2px 12px rgba(var(--color-verde-oscuro-rgb), 0.05)',
          cursor: 'pointer', width: '100%',
          display: 'flex', flexDirection: 'column', gap: '12px',
        }}
      >
        {/* Icono */}
        <div style={{
          width: '48px', height: '48px', borderRadius: '14px',
          background: colorClaro,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '24px', transition: 'transform 0.28s',
          transform: hover ? 'scale(1.1)' : 'scale(1)',
        }}>
          {emoji}
        </div>

        {/* Nombre */}
        <h3 style={{
          fontFamily: 'var(--font-titulo)',
          fontSize: '18px', fontWeight: 700,
          color: hover ? color : 'var(--color-verde-oscuro)',
          margin: 0, lineHeight: 1.2, transition: 'color 0.2s',
        }}>
          {nombre}
        </h3>

        {/* Descripción */}
        <p style={{
          fontSize: '13px', color: 'rgba(var(--color-verde-oscuro-rgb), 0.6)',
          lineHeight: 1.7, margin: 0, flex: 1, fontWeight: 300,
        }}>
          {descripcion}
        </p>

        {extra && (
          <p style={{ fontSize: '11px', fontWeight: 600, color, margin: 0 }}>
            ✦ {extra}
          </p>
        )}

        {/* Flecha */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginTop: '4px',
        }}>
          <span style={{ fontSize: '12px', color, fontWeight: 700 }}>
            Explorar
          </span>
          <div style={{
            width: '30px', height: '30px', borderRadius: '50%',
            background: colorClaro,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', color,
            transition: 'transform 0.25s',
            transform: hover ? 'translateX(4px)' : 'translateX(0)',
          }}>
            →
          </div>
        </div>
      </div>
    </Link>
  )
}