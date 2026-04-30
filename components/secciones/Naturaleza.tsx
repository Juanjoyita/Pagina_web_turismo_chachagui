'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import AnimarAlEntrar from '@/components/AnimarAlEntrar'
import { naturaleza } from '@/data/naturaleza'

const categorias = ['Todos', 'Reserva', 'Cascada', 'Sendero', 'Mirador', 'Finca']

function CardNaturaleza({ item }: { item: typeof naturaleza[0] }) {
  const [hover, setHover] = useState(false)

  return (
    <Link href={`/naturaleza/${item.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          overflow: 'hidden',
          borderLeft: `4px solid ${hover ? 'var(--color-verde-claro)' : 'var(--color-verde-oscuro)'}`,
          transition: 'transform 0.28s, box-shadow 0.28s, border-color 0.28s',
          transform: hover ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow: hover
            ? '0 14px 34px rgba(var(--color-verde-oscuro-rgb), 0.10)'
            : '0 1px 3px rgba(var(--color-verde-oscuro-rgb), 0.04)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Imagen real de la card */}
        <div
          style={{
            width: '100%',
            aspectRatio: '4/3',
            position: 'relative',
            overflow: 'hidden',
            background: 'var(--color-verde-oscuro)',
          }}
        >
          <img
            src={item.imagen}
            alt={item.nombre}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transform: hover ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 0.5s ease',
            }}
          />
          {/* Degradado sutil inferior para legibilidad del badge */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(var(--color-verde-oscuro-rgb), 0) 40%, rgba(var(--color-verde-oscuro-rgb), 0.35) 100%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: hover ? 'var(--color-verde-claro)' : 'rgba(var(--color-verde-oscuro-rgb), 0.85)',
              color: hover ? 'var(--color-verde-oscuro)' : '#FFFFFF',
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              padding: '4px 10px',
              borderRadius: '20px',
              transition: 'all 0.28s',
              backdropFilter: 'blur(4px)',
            }}
          >
            {item.categoria}
          </div>
        </div>

        {/* Contenido */}
        <div
          style={{
            padding: '20px 22px 22px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-titulo)',
              fontSize: '17px',
              fontWeight: 700,
              color: hover ? 'var(--color-verde-claro)' : 'var(--color-verde-oscuro)',
              margin: 0,
              lineHeight: 1.2,
              transition: 'color 0.2s',
            }}
          >
            {item.nombre}
          </h3>

          <p
            style={{
              fontSize: '12.5px',
              color: 'rgba(var(--color-verde-oscuro-rgb), 0.55)',
              lineHeight: 1.65,
              margin: 0,
              flex: 1,
              fontWeight: 300,
            }}
          >
            {item.descripcion.length > 80
              ? item.descripcion.slice(0, 80) + '…'
              : item.descripcion}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              marginTop: '2px',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                color: 'rgba(var(--color-verde-oscuro-rgb), 0.45)',
                fontWeight: 500,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              📍 {item.ubicacion}
            </span>
            <span
              style={{
                fontSize: '12px',
                color: hover ? 'var(--color-verde-claro)' : 'rgba(var(--color-verde-oscuro-rgb), 0.4)',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                transition: 'color 0.2s, transform 0.2s',
                transform: hover ? 'translateX(3px)' : 'translateX(0)',
                flexShrink: 0,
              }}
            >
              Ver más →
            </span>
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

  useEffect(() => {
    if (categoriaParam && categorias.includes(categoriaParam)) {
      setCatActiva(categoriaParam)
    } else {
      setCatActiva('Todos')
    }
  }, [categoriaParam])

  const filtrados =
    catActiva === 'Todos'
      ? naturaleza
      : naturaleza.filter((n) => n.categoria === catActiva)

  const stats = [
    { valor: '12', label: 'Lugares' },
    { valor: '4', label: 'Reservas' },
    { valor: '2', label: 'Cascadas' },
    { valor: '2', label: 'Fincas' },
  ]

  return (
    <section
      id="naturaleza"
      style={{
        padding: '100px 0',
        background: 'var(--color-fondo)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>

        {/* Encabezado */}
        <AnimarAlEntrar direccion="arriba">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-titulo)',
                fontSize: 'clamp(32px, 5vw, 56px)',
                fontWeight: 800,
                color: 'var(--color-verde-oscuro)',
                letterSpacing: '-1.5px',
                lineHeight: 1.05,
                marginBottom: '20px',
              }}
            >
              Naturaleza y{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--color-verde-claro)' }}>Paisajes</em>
            </h2>
            <div
              style={{
                width: '60px',
                height: '4px',
                background: 'linear-gradient(90deg, var(--color-verde-oscuro), var(--color-verde-claro))',
                borderRadius: '2px',
                margin: '0 auto 20px',
              }}
            />
            <p
              style={{
                fontSize: '16px',
                color: 'rgba(var(--color-verde-oscuro-rgb), 0.6)',
                fontWeight: 300,
                lineHeight: 1.8,
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              Cascadas, reservas naturales, senderos y fincas cafeteras que forman
              uno de los paisajes más hermosos del sur de Colombia.
            </p>
          </div>
        </AnimarAlEntrar>

        {/* Filtros */}
        <AnimarAlEntrar direccion="arriba" delay={100}>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginBottom: '48px',
            }}
          >
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCatActiva(cat)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '30px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  border: 'none',
                  background: catActiva === cat ? 'var(--color-verde-oscuro)' : '#FFFFFF',
                  color: catActiva === cat ? 'var(--color-verde-claro)' : 'rgba(var(--color-verde-oscuro-rgb), 0.6)',
                  boxShadow:
                    catActiva === cat
                      ? '0 4px 16px rgba(var(--color-verde-oscuro-rgb), 0.25)'
                      : '0 1px 4px rgba(var(--color-verde-oscuro-rgb), 0.05)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimarAlEntrar>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {filtrados.map((item, i) => (
            <AnimarAlEntrar key={item.id} direccion="arriba" delay={i * 60}>
              <CardNaturaleza item={item} />
            </AnimarAlEntrar>
          ))}
        </div>

        {/* Stats strip — sin cajas, al estilo del hero */}
        <AnimarAlEntrar direccion="arriba" delay={200}>
          <div
            className="naturaleza-stats"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0',
              marginTop: '80px',
              padding: '8px 0',
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '40px',
                }}
              >
                {i > 0 && (
                  <div
                    style={{
                      width: '1px',
                      height: '48px',
                      background: 'rgba(var(--color-verde-oscuro-rgb), 0.15)',
                    }}
                  />
                )}
                <div
                  style={{
                    textAlign: 'center',
                    padding: '0 40px',
                    minWidth: '120px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-titulo)',
                      fontSize: 'clamp(32px, 4vw, 44px)',
                      fontWeight: 800,
                      color: 'var(--color-verde-oscuro)',
                      lineHeight: 1,
                      marginBottom: '6px',
                    }}
                  >
                    {stat.valor}
                  </div>
                  <div
                    style={{
                      fontSize: '10.5px',
                      color: 'rgba(var(--color-verde-oscuro-rgb), 0.5)',
                      letterSpacing: '2.5px',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}
                  >
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
          .naturaleza-stats {
            flex-wrap: wrap !important;
            gap: 16px 0 !important;
          }
          .naturaleza-stats > div > div {
            padding: 0 20px !important;
            min-width: 110px !important;
          }
        }
      `}</style>
    </section>
  )
}
