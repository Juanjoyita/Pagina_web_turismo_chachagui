'use client'

import Link from 'next/link'
import { useState } from 'react'
import AnimarAlEntrar from '@/components/AnimarAlEntrar'
import { prestadores } from '@/data/prestadores'

const categorias = ['Todos', 'Hospedaje', 'Naturaleza', 'Recreación', 'Bienestar']

const categoriaColor: Record<string, string> = {
  Hospedaje:  '#5a3a7a',
  Naturaleza: 'var(--color-verde-oscuro)',
  Recreación: '#1a5a7a',
  Bienestar:  '#7a5a1a',
}

const categoriaEmoji: Record<string, string> = {
  Hospedaje:  '🏡',
  Naturaleza: '🌿',
  Recreación: '🏊',
  Bienestar:  '🌺',
}

function CardPrestador({ item }: { item: typeof prestadores[0] }) {
  const [hover, setHover] = useState(false)
  const color = categoriaColor[item.categoria] || 'var(--color-verde-oscuro)'

  return (
    <Link
      href={`/servicios/${item.slug}`}
      style={{ textDecoration: 'none', display: 'flex', height: '100%' }}
    >
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          overflow: 'hidden',
          borderLeft: `4px solid ${hover ? color : 'rgba(var(--color-verde-oscuro-rgb), 0.15)'}`,
          transition: 'transform 0.28s, box-shadow 0.28s, border-color 0.28s',
          transform: hover ? 'translateY(-5px)' : 'translateY(0)',
          boxShadow: hover
            ? '0 18px 40px rgba(var(--color-verde-oscuro-rgb), 0.12)'
            : '0 2px 8px rgba(var(--color-verde-oscuro-rgb), 0.05)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        {/* Imagen */}
        <div style={{
          width: '100%', aspectRatio: '4/3',
          position: 'relative', overflow: 'hidden',
          background: 'var(--color-verde-oscuro)',
        }}>
          <img
            src={item.imagen}
            alt={item.nombre}
            loading="lazy"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', display: 'block',
              transform: hover ? 'scale(1.07)' : 'scale(1)',
              transition: 'transform 0.5s ease',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, transparent 40%, rgba(var(--color-verde-oscuro-rgb), 0.30) 100%)',
            pointerEvents: 'none',
          }} />
          {/* Badge categoría */}
          <span style={{
            position: 'absolute', top: '12px', right: '12px',
            background: hover ? color : 'rgba(var(--color-verde-oscuro-rgb), 0.82)',
            color: '#FFFFFF',
            fontSize: '9px', fontWeight: 700,
            letterSpacing: '1.5px', textTransform: 'uppercase',
            padding: '4px 10px', borderRadius: '20px',
            transition: 'background 0.28s',
            backdropFilter: 'blur(4px)',
          }}>
            {categoriaEmoji[item.categoria]} {item.categoria}
          </span>
        </div>

        {/* Contenido */}
        <div style={{
          padding: '18px 20px 20px',
          flex: 1, display: 'flex', flexDirection: 'column', gap: '8px',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-titulo)',
            fontSize: '16px', fontWeight: 700,
            color: hover ? color : 'var(--color-verde-oscuro)',
            margin: 0, lineHeight: 1.25,
            transition: 'color 0.2s',
          }}>
            {item.nombre}
          </h3>

          <p style={{
            fontSize: '12px',
            color: 'rgba(var(--color-verde-oscuro-rgb), 0.55)',
            lineHeight: 1.65, margin: 0, flex: 1, fontWeight: 300,
          }}>
            {item.descripcion.length > 110
              ? item.descripcion.slice(0, 110) + '…'
              : item.descripcion}
          </p>

          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', gap: '8px', marginTop: '4px',
          }}>
            <span style={{
              fontSize: '11px',
              color: 'rgba(var(--color-verde-oscuro-rgb), 0.4)',
              fontWeight: 500, overflow: 'hidden',
              textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              📍 {item.ubicacion}
            </span>
            <span style={{
              fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap',
              color: hover ? color : 'rgba(var(--color-verde-oscuro-rgb), 0.35)',
              transition: 'color 0.2s, transform 0.2s',
              transform: hover ? 'translateX(3px)' : 'translateX(0)',
              flexShrink: 0,
            }}>
              Ver más →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function Servicios() {
  const [catActiva, setCatActiva] = useState('Todos')

  const filtrados =
    catActiva === 'Todos'
      ? prestadores
      : prestadores.filter((p) => p.categoria === catActiva)

  // Stats dinámicos
  const totalPrestadores = prestadores.length
  const totalHospedaje   = prestadores.filter((p) => p.categoria === 'Hospedaje').length
  const totalNaturaleza  = prestadores.filter((p) => p.categoria === 'Naturaleza').length
  const totalRec         = prestadores.filter((p) => p.categoria === 'Recreación').length

  const stats = [
    { valor: String(totalPrestadores), label: 'Prestadores' },
    { valor: String(totalHospedaje),   label: 'Hospedaje' },
    { valor: String(totalNaturaleza),  label: 'Naturaleza' },
    { valor: String(totalRec),         label: 'Recreación' },
  ]

  return (
    <section
      id="servicios"
      style={{ padding: '100px 0', background: 'var(--color-fondo)' }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>

        {/* Encabezado */}
        <AnimarAlEntrar direccion="arriba">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{
              fontFamily: 'var(--font-titulo)',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800, color: 'var(--color-verde-oscuro)',
              letterSpacing: '-1.5px', lineHeight: 1.05, marginBottom: '20px',
            }}>
              Servicios{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--color-verde-claro)' }}>Turísticos</em>
            </h2>
            <div style={{
              width: '60px', height: '4px',
              background: 'linear-gradient(90deg, var(--color-verde-oscuro), var(--color-verde-claro))',
              borderRadius: '2px', margin: '0 auto 20px',
            }} />
            <p style={{
              fontSize: '16px', color: 'rgba(var(--color-verde-oscuro-rgb), 0.6)',
              fontWeight: 300, lineHeight: 1.8, maxWidth: '600px', margin: '0 auto',
            }}>
              Hospedaje, naturaleza, recreación y bienestar — todo lo que necesitas
              para vivir una experiencia completa en Chachagüí.
            </p>
          </div>
        </AnimarAlEntrar>

        {/* Filtros */}
        <AnimarAlEntrar direccion="arriba" delay={100}>
          <div style={{
            display: 'flex', gap: '10px', flexWrap: 'wrap',
            justifyContent: 'center', marginBottom: '48px',
          }}>
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCatActiva(cat)}
                style={{
                  padding: '8px 20px', borderRadius: '30px',
                  fontSize: '12px', fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.2s', border: 'none',
                  background: catActiva === cat ? 'var(--color-verde-oscuro)' : '#FFFFFF',
                  color: catActiva === cat
                    ? 'var(--color-verde-claro)'
                    : 'rgba(var(--color-verde-oscuro-rgb), 0.6)',
                  boxShadow: catActiva === cat
                    ? '0 4px 16px rgba(var(--color-verde-oscuro-rgb), 0.25)'
                    : '0 1px 4px rgba(var(--color-verde-oscuro-rgb), 0.05)',
                }}
              >
                {cat !== 'Todos' ? `${categoriaEmoji[cat]} ` : ''}{cat}
              </button>
            ))}
          </div>
        </AnimarAlEntrar>

        {/* Grid de cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px', alignItems: 'stretch',
        }}>
          {filtrados.map((item, i) => (
            <AnimarAlEntrar
              key={item.id}
              direccion="arriba"
              delay={i * 60}
              style={{ height: '100%' }}
            >
              <CardPrestador item={item} />
            </AnimarAlEntrar>
          ))}
        </div>

        {/* Stats strip */}
        <AnimarAlEntrar direccion="arriba" delay={200}>
          <div
            className="srv-stats"
            style={{
              display: 'flex', justifyContent: 'center',
              alignItems: 'center', gap: '0',
              marginTop: '80px', padding: '8px 0',
            }}
          >
            {stats.map((stat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                {i > 0 && (
                  <div style={{
                    width: '1px', height: '48px',
                    background: 'rgba(var(--color-verde-oscuro-rgb), 0.15)',
                  }} />
                )}
                <div style={{
                  textAlign: 'center', padding: '0 40px', minWidth: '120px',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-titulo)',
                    fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 800,
                    color: 'var(--color-verde-oscuro)', lineHeight: 1, marginBottom: '6px',
                  }}>
                    {stat.valor}
                  </div>
                  <div style={{
                    fontSize: '10.5px',
                    color: 'rgba(var(--color-verde-oscuro-rgb), 0.5)',
                    letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 600,
                  }}>
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimarAlEntrar>

      </div>

      <style>{`
        @media (max-width: 720px) {
          .srv-stats {
            flex-wrap: wrap !important;
            gap: 16px 0 !important;
          }
          .srv-stats > div > div {
            padding: 0 20px !important;
            min-width: 110px !important;
          }
        }
      `}</style>
    </section>
  )
}
