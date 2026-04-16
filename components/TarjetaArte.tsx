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
  color = '#1a4a2e',
  colorClaro = 'rgba(26,74,46,0.08)',
}: Props) {
  const [hover, setHover] = useState(false)
  const destino = href || `/arte/${id}`

  return (
    <Link href={destino} style={{ textDecoration: 'none', display: 'flex' }}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: hover ? '#fff' : '#fff',
          borderRadius: '20px',
          padding: '28px 24px',
          borderTop: `1.5px solid ${hover ? color : '#ede4d8'}`,
          borderRight: `1.5px solid ${hover ? color : '#ede4d8'}`,
          borderBottom: `1.5px solid ${hover ? color : '#ede4d8'}`,
          borderLeft: `5px solid ${color}`,
          transition: 'all 0.28s ease',
          transform: hover ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: hover
            ? `0 20px 48px rgba(0,0,0,0.12), 0 0 0 0px ${color}`
            : '0 2px 12px rgba(0,0,0,0.05)',
          cursor: 'pointer',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {/* Icono con fondo */}
        <div style={{
          width: '48px', height: '48px',
          borderRadius: '14px',
          background: colorClaro,
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '24px',
          transition: 'transform 0.28s',
          transform: hover ? 'scale(1.1)' : 'scale(1)',
        }}>
          {emoji}
        </div>

        {/* Nombre */}
        <h3 style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: '18px', fontWeight: 700,
          color: hover ? color : '#1a2e1a',
          margin: 0, lineHeight: 1.2,
          transition: 'color 0.2s',
        }}>
          {nombre}
        </h3>

        {/* Descripción */}
        <p style={{
          fontSize: '13px', color: '#6a5848',
          lineHeight: 1.7, margin: 0, flex: 1,
          fontWeight: 300,
        }}>
          {descripcion}
        </p>

        {extra && (
          <p style={{
            fontSize: '11px', fontWeight: 600,
            color, margin: 0,
          }}>
            ✦ {extra}
          </p>
        )}

        {/* Flecha */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginTop: '4px',
        }}>
          <span style={{
            fontSize: '12px', color, fontWeight: 700,
            letterSpacing: '0.3px',
          }}>
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