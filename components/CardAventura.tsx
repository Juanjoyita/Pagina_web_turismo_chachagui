'use client'

import Link from 'next/link'
import { useState } from 'react'

interface Props {
  slug: string
  actividad: string
  descripcionCorta: string
  emoji: string
  tag: string
}

export default function CardAventura({ slug, actividad, descripcionCorta, emoji, tag }: Props) {
  const [hover, setHover] = useState(false)

  return (
    <Link href={`/aventura/${slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: hover ? 'rgba(250,181,17,0.06)' : 'rgba(255,255,255,0.04)',
          borderTop: `1px solid ${hover ? 'rgba(250,181,17,0.3)' : 'rgba(255,255,255,0.08)'}`,
          borderRight: `1px solid ${hover ? 'rgba(250,181,17,0.3)' : 'rgba(255,255,255,0.08)'}`,
          borderBottom: `1px solid ${hover ? 'rgba(250,181,17,0.3)' : 'rgba(255,255,255,0.08)'}`,
          borderLeft: '4px solid #4A7C59',
          borderRadius: '16px',
          padding: '28px 24px',
          height: '100%',
          display: 'flex', flexDirection: 'column', gap: '12px',
          cursor: 'pointer', transition: 'all 0.28s',
          transform: hover ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: hover ? '0 20px 48px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        {/* Emoji + tag */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontSize: '28px',
            background: 'rgba(74,124,89,0.2)',
            width: '56px', height: '56px', borderRadius: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {emoji}
          </span>
          <span style={{
            background: 'rgba(250,181,17,0.12)',
            color: '#FAB511',
            fontSize: '10px', fontWeight: 700,
            letterSpacing: '1.5px', textTransform: 'uppercase',
            padding: '4px 12px', borderRadius: '20px',
            border: '1px solid rgba(250,181,17,0.2)',
          }}>
            {tag}
          </span>
        </div>

        {/* Título */}
        <h3 style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: '20px', fontWeight: 700,
          color: hover ? '#FAB511' : '#FFFFFF',
          margin: 0, transition: 'color 0.2s',
        }}>
          {actividad}
        </h3>

        {/* Descripción */}
        <p style={{
          fontSize: '13px', color: 'rgba(255,246,230,0.5)',
          lineHeight: 1.7, margin: 0, flex: 1, fontWeight: 300,
        }}>
          {descripcionCorta}
        </p>

        {/* Ver más */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginTop: '8px',
        }}>
          <span style={{ fontSize: '12px', color: '#FAB511', fontWeight: 700 }}>
            Ver más
          </span>
          <div style={{
            width: '30px', height: '30px', borderRadius: '50%',
            background: 'rgba(250,181,17,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', color: '#FAB511',
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