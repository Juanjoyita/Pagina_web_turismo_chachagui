'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import AnimarAlEntrar from '@/components/AnimarAlEntrar'
import { naturaleza } from '@/data/naturaleza'

const categorias = ['Todos', 'Reserva', 'Cascada', 'Sendero', 'Mirador', 'Finca']

const coloresCat: Record<string, string> = {
  Reserva: '#1C2316',
  Cascada: '#1C2316',
  Sendero: '#1C2316',
  Mirador: '#1C2316',
  Finca:   '#1C2316',
}

function CardNaturaleza({ item }: { item: typeof naturaleza[0] }) {
  const [hover, setHover] = useState(false)
  const color = coloresCat[item.categoria] || '#1C2316'

  return (
    <Link href={`/naturaleza/${item.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: '#FFFFFF',
          borderRadius: '18px',
          overflow: 'hidden',
          borderTop: `1.5px solid ${hover ? '#CAD74B' : '#E8E0D4'}`,
          borderRight: `1.5px solid ${hover ? '#CAD74B' : '#E8E0D4'}`,
          borderBottom: `1.5px solid ${hover ? '#CAD74B' : '#E8E0D4'}`,
          borderLeft: `5px solid ${hover ? '#CAD74B' : '#1C2316'}`,
          transition: 'all 0.28s',
          transform: hover ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: hover ? '0 20px 48px rgba(28,35,22,0.14)' : '0 2px 12px rgba(28,35,22,0.05)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Imagen placeholder */}
        <div style={{
          width: '100%', aspectRatio: '16/10',
          background: hover
            ? 'linear-gradient(135deg, rgba(202,215,75,0.2), rgba(202,215,75,0.35))'
            : 'linear-gradient(135deg, rgba(28,35,22,0.08), rgba(28,35,22,0.15))',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '48px',
          position: 'relative', transition: 'background 0.28s',
        }}>
          {item.emoji}
          <div style={{
            position: 'absolute', top: '12px', right: '12px',
            background: hover ? '#CAD74B' : '#1C2316',
            color: hover ? '#1C2316' : '#FFFFFF',
            fontSize: '9px', fontWeight: 700,
            letterSpacing: '1.5px', textTransform: 'uppercase',
            padding: '4px 10px', borderRadius: '20px',
            transition: 'all 0.28s',
          }}>
            {item.categoria}
          </div>
        </div>

        {/* Contenido */}
        <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h3 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '17px', fontWeight: 700,
            color: hover ? '#CAD74B' : '#1C2316',
            margin: 0, lineHeight: 1.2, transition: 'color 0.2s',
          }}>
            {item.nombre}
          </h3>

          <p style={{
            fontSize: '12px', color: 'rgba(28,35,22,0.55)',
            lineHeight: 1.65, margin: 0, flex: 1, fontWeight: 300,
          }}>
            {item.descripcion.length > 120
              ? item.descripcion.slice(0, 120) + '...'
              : item.descripcion}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
            <span style={{ fontSize: '11px', color: '#1C2316', fontWeight: 600 }}>
              📍 {item.ubicacion}
            </span>
            <span style={{ fontSize: '11px', color: 'rgba(28,35,22,0.45)', fontWeight: 400 }}>
              {item.actividades}
            </span>
          </div>

          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', marginTop: '8px',
          }}>
            <span style={{ fontSize: '12px', color: hover ? '#CAD74B' : '#1C2316', fontWeight: 700, transition: 'color 0.2s' }}>
              Ver más
            </span>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: hover ? 'rgba(202,215,75,0.2)' : 'rgba(28,35,22,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '13px', color: hover ? '#CAD74B' : '#1C2316',
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

export default function Naturaleza() {
  const searchParams = useSearchParams()
  const categoriaParam = searchParams.get('categoria')
  const [catActiva, setCatActiva] = useState(
    categoriaParam && categorias.includes(categoriaParam) ? categoriaParam : 'Todos'
  )

  // Cuando cambia la URL actualiza el filtro
  useEffect(() => {
    if (categoriaParam && categorias.includes(categoriaParam)) {
      setCatActiva(categoriaParam)
    } else {
      setCatActiva('Todos')
    }
  }, [categoriaParam])

  const filtrados = catActiva === 'Todos'
    ? naturaleza
    : naturaleza.filter(n => n.categoria === catActiva)

  return (
    <section
      id="naturaleza"
      style={{
        padding: '100px 0',
        background: '#F1F1F1',
        backgroundImage: 'repeating-linear-gradient(-55deg, transparent, transparent 14px, rgba(28,35,22,0.02) 14px, rgba(28,35,22,0.02) 15px)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>

        {/* Encabezado */}
        <AnimarAlEntrar direccion="arriba">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(28,35,22,0.08)', color: '#1C2316',
              fontSize: '10px', fontWeight: 700, letterSpacing: '3px',
              textTransform: 'uppercase', padding: '6px 18px',
              borderRadius: '30px', marginBottom: '20px',
            }}>
              🏞️ Sección 03
            </div>
            <h2 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800, color: '#1C2316',
              letterSpacing: '-1.5px', lineHeight: 1.05,
              marginBottom: '20px',
            }}>
              Naturaleza y <em style={{ fontStyle: 'italic', color: '#CAD74B' }}>Paisajes</em>
            </h2>
            <div style={{
              width: '60px', height: '4px',
              background: 'linear-gradient(90deg, #1C2316, #CAD74B)',
              borderRadius: '2px', margin: '0 auto 20px',
            }} />
            <p style={{
              fontSize: '16px', color: 'rgba(28,35,22,0.6)',
              fontWeight: 300, lineHeight: 1.8,
              maxWidth: '600px', margin: '0 auto',
            }}>
              Cascadas, reservas naturales, senderos y fincas cafeteras que forman
              uno de los paisajes más hermosos del sur de Colombia.
            </p>
          </div>
        </AnimarAlEntrar>

        {/* Filtros */}
        <AnimarAlEntrar direccion="arriba" delay={100}>
          <div style={{
            display: 'flex', gap: '10px', flexWrap: 'wrap',
            justifyContent: 'center', marginBottom: '48px',
          }}>
            {categorias.map(cat => (
              <button
                key={cat}
                onClick={() => setCatActiva(cat)}
                style={{
                  padding: '8px 20px', borderRadius: '30px',
                  fontSize: '12px', fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.2s',
                  border: 'none',
                  background: catActiva === cat ? '#1C2316' : '#FFFFFF',
                  color: catActiva === cat ? '#CAD74B' : 'rgba(28,35,22,0.6)',
                  boxShadow: catActiva === cat
                    ? '0 4px 16px rgba(28,35,22,0.25)'
                    : '0 2px 8px rgba(28,35,22,0.08)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimarAlEntrar>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {filtrados.map((item, i) => (
            <AnimarAlEntrar key={item.id} direccion="arriba" delay={i * 60}>
              <CardNaturaleza item={item} />
            </AnimarAlEntrar>
          ))}
        </div>

        {/* Stats */}
        <AnimarAlEntrar direccion="arriba" delay={200}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginTop: '64px',
          }}>
            {[
              { valor: '12', label: 'Lugares naturales', emoji: '🗺️' },
              { valor: '4',  label: 'Reservas naturales', emoji: '🌿' },
              { valor: '2',  label: 'Cascadas',           emoji: '💧' },
              { valor: '2',  label: 'Fincas cafeteras',   emoji: '☕' },
            ].map((stat, i) => (
              <div key={i} style={{
                background: '#FFFFFF',
                borderRadius: '16px', padding: '28px 20px',
                textAlign: 'center',
                borderTop: '1.5px solid #E8E0D4',
                borderRight: '1.5px solid #E8E0D4',
                borderBottom: '1.5px solid #E8E0D4',
                borderLeft: '4px solid #CAD74B',
                boxShadow: '0 2px 12px rgba(28,35,22,0.05)',
              }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.emoji}</div>
                <div style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: '32px', fontWeight: 800,
                  color: '#1C2316', lineHeight: 1, marginBottom: '6px',
                }}>
                  {stat.valor}
                </div>
                <div style={{
                  fontSize: '11px', color: 'rgba(28,35,22,0.45)',
                  letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600,
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </AnimarAlEntrar>

      </div>

      <style>{`
        @media (max-width: 900px) {
          #naturaleza > div > div:nth-child(4) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          #naturaleza > div > div:nth-child(4) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}