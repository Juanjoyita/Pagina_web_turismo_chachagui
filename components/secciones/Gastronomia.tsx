'use client'

import Link from 'next/link'
import AnimarAlEntrar from '@/components/AnimarAlEntrar'
import CarruselGastronomia from '@/components/CarruselGastronomia'
import { gastronomia } from '@/data/gastronomia'

export default function Gastronomia() {
  // Mostramos solo 3 platos en la sección principal
  const platosDestacados = gastronomia.slice(0, 3)

  // Slides del carrusel: usa la primera imagen de cada plato
  const slidesCarrusel = gastronomia.map((p) => ({
    imagen: p.imagenes[0],
    nombre: p.nombre,
    categoria: p.categoria,
  }))

  return (
    <section
      id="gastronomia"
      style={{
        position: 'relative',
        padding: '120px 0 100px',
        background: 'var(--color-fondo)',
        backgroundImage:
          'radial-gradient(circle, rgba(var(--color-verde-oscuro-rgb), 0.04) 1.5px, transparent 1.5px)',
        backgroundSize: '28px 28px',
      }}
    >
      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 40px' }}>

        {/* Encabezado centrado */}
        <AnimarAlEntrar direccion="arriba">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(var(--color-verde-oscuro-rgb), 0.06)',
                color: 'var(--color-verde-oscuro)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                padding: '6px 16px',
                borderRadius: '30px',
                marginBottom: '18px',
              }}
            >
              🍽️ Sabores de Nariño
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-titulo)',
                fontSize: 'clamp(32px, 5vw, 54px)',
                fontWeight: 800,
                color: 'var(--color-verde-oscuro)',
                letterSpacing: '-1.5px',
                lineHeight: 1.05,
                margin: '0 0 16px',
              }}
            >
              Gastronomía{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--color-verde-oscuro)' }}>Local</em>
            </h2>

            <div
              style={{
                width: '60px',
                height: '4px',
                background: 'var(--color-verde-claro)',
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
              La cocina nariñense es una fusión de sabores andinos únicos que
              Chachagüí tiene para ofrecerte en cada bocado, cada celebración y
              cada rincón.
            </p>
          </div>
        </AnimarAlEntrar>

        {/* Layout 2 columnas: lista resumida + carrusel */}
        <div
          className="gastro-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.05fr',
            gap: '48px',
            alignItems: 'start',
          }}
        >

          {/* Columna izquierda: lista de 3 platos + Ver más */}
          <AnimarAlEntrar direccion="izquierda">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '22px',
                minHeight: '520px',
                justifyContent: 'space-between',
              }}
            >
              {platosDestacados.map((item) => (
                <Link
                  key={item.id}
                  href={`/gastronomia/${item.slug}`}
                  className="gastro-card"
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    background: '#FFFFFF',
                    borderRadius: '14px',
                    padding: '18px 20px',
                    borderTop: '1.5px solid var(--color-borde)',
                    borderRight: '1.5px solid var(--color-borde)',
                    borderBottom: '1.5px solid var(--color-borde)',
                    borderLeft: '5px solid var(--color-verde-claro)',
                    cursor: 'pointer',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    boxShadow: '0 2px 10px rgba(var(--color-verde-oscuro-rgb), 0.05)',
                  }}
                >
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '12px',
                      background: 'rgba(var(--color-verde-claro-rgb), 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '26px',
                      flexShrink: 0,
                    }}
                  >
                    {item.emoji}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-titulo)',
                        fontSize: '15px',
                        fontWeight: 700,
                        color: 'var(--color-verde-oscuro)',
                        marginBottom: '3px',
                      }}
                    >
                      {item.nombre}
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: 'rgba(var(--color-verde-oscuro-rgb), 0.6)',
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {item.descripcion}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: '10px',
                      color: 'var(--color-verde-oscuro)',
                      fontWeight: 700,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      padding: '4px 10px',
                      borderRadius: '12px',
                      background: 'rgba(var(--color-verde-claro-rgb), 0.15)',
                    }}
                  >
                    {item.categoria}
                  </div>
                </Link>
              ))}

              {/* Botón Ver más */}
              <Link
                href="/gastronomia/platos"
                className="gastro-ver-mas"
                style={{
                  alignSelf: 'center',
                  marginTop: '4px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: 'var(--color-verde-claro)',
                  color: 'var(--color-verde-oscuro)',
                  textDecoration: 'none',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '1.8px',
                  textTransform: 'uppercase',
                  padding: '10px 20px',
                  borderRadius: '30px',
                  border: '1.5px solid var(--color-verde-claro)',
                  boxShadow: '0 4px 14px rgba(var(--color-verde-claro-rgb), 0.25)',
                  transition: 'transform 0.25s ease, box-shadow 0.3s ease, background 0.3s ease',
                }}
              >
                Ver todos los platos →
              </Link>
            </div>
          </AnimarAlEntrar>

          {/* Columna derecha: carrusel auto-rotativo */}
          <AnimarAlEntrar direccion="derecha" delay={120}>
            <CarruselGastronomia slides={slidesCarrusel} intervalo={3000} />
          </AnimarAlEntrar>

        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          #gastronomia .gastro-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* Hover sutil en las tarjetas de platos */
        #gastronomia .gastro-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(var(--color-verde-oscuro-rgb), 0.10);
        }

        /* Botón "Ver más" — efecto brillo al pasar el cursor */
        #gastronomia .gastro-ver-mas {
          position: relative;
          overflow: hidden;
        }
        #gastronomia .gastro-ver-mas::before {
          content: '';
          position: absolute;
          top: 0;
          left: -85%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255,255,255,0.55) 50%,
            transparent 100%
          );
          transform: skewX(-20deg);
          transition: left 0.7s ease;
          pointer-events: none;
        }
        #gastronomia .gastro-ver-mas:hover {
          transform: translateY(-2px);
          background: var(--color-verde-claro-hover) !important;
          box-shadow:
            0 0 0 4px rgba(var(--color-verde-claro-rgb), 0.20),
            0 8px 24px rgba(var(--color-verde-claro-rgb), 0.45),
            0 0 28px rgba(var(--color-verde-claro-rgb), 0.55);
        }
        #gastronomia .gastro-ver-mas:hover::before {
          left: 130%;
        }
      `}</style>
    </section>
  )
}
