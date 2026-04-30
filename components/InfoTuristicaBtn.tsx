'use client'

import Link from 'next/link'
import { useState } from 'react'

/**
 * Botón flotante con el símbolo internacional de Información Turística
 * (una "i" italica blanca sobre fondo rojo). Enlaza a servicios,
 * que es la página principal de información turística de Chachagüí.
 */
export default function InfoTuristicaBtn() {
  const [hover, setHover] = useState(false)

  return (
    <Link
      href="/servicios"
      aria-label="Información Turística — Ver servicios"
      title="Información Turística"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: 900,
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: '#D1232A',
        border: `1.5px solid ${hover ? '#FFFFFF' : 'rgba(255,255,255,0.25)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        boxShadow: hover
          ? '0 10px 22px rgba(209,35,42,0.5)'
          : '0 4px 12px rgba(209,35,42,0.35)',
        transition:
          'transform 0.25s, box-shadow 0.25s, border-color 0.25s',
        transform: hover
          ? 'scale(1.08) translateY(-2px)'
          : 'scale(1) translateY(0)',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontStyle: 'italic',
          fontWeight: 700,
          color: '#FFFFFF',
          fontSize: '24px',
          lineHeight: 1,
          paddingBottom: '2px',
          userSelect: 'none',
        }}
      >
        i
      </span>
    </Link>
  )
}
