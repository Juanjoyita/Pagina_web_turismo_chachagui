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
}

export default function TarjetaArte({ id, nombre, descripcion, emoji, extra, href }: Props) {
  const [hover, setHover] = useState(false)
  const destino = href || `/arte/${id}`

  return (
    <Link href={destino} style={{ textDecoration: 'none' }}>
      <div
        style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '20px',
          border: hover ? '1.5px solid #2a7a4a' : '1.5px solid #e8d8c0',
          borderLeft: '4px solid #2a7a4a',
          transition: 'all 0.25s',
          transform: hover ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow: hover ? '0 12px 32px rgba(26,74,46,0.14)' : 'none',
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span style={{ fontSize: '28px' }}>{emoji}</span>

        <h3 style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: '17px', fontWeight: 700,
          color: '#1a4a2e', margin: 0,
        }}>
          {nombre}
        </h3>

        <p style={{
          fontSize: '13px', color: '#5a4030',
          lineHeight: 1.65, margin: 0, flex: 1,
        }}>
          {descripcion}
        </p>

        {extra && (
          <p style={{ fontSize: '11px', color: '#2a7a4a', fontWeight: 600, margin: 0 }}>
            ✦ {extra}
          </p>
        )}

        <span style={{ fontSize: '12px', color: '#b04a1a', fontWeight: 700 }}>
          Ver más →
        </span>
      </div>
    </Link>
  )
}