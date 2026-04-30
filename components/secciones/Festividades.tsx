'use client'

import Link from 'next/link'
import AnimarAlEntrar from '@/components/AnimarAlEntrar'
import { eventos, calendarioEventos } from '@/data/eventos'

export default function Festividades() {
  return (
    <section
      id="festividades"
      style={{
        padding: '100px 0',
        background: 'var(--color-verde-oscuro)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Patrón de fondo decorativo */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(var(--color-verde-claro-rgb), 0.08) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(var(--color-verde-claro-rgb), 0.12) 0%, transparent 40%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 40px', position: 'relative' }}>

        {/* Encabezado */}
        <AnimarAlEntrar direccion="arriba">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{
              fontFamily: 'var(--font-titulo)',
              fontSize: 'clamp(28px, 4.5vw, 48px)',
              fontWeight: 800, color: 'var(--color-fondo)',
              letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '14px',
            }}>
              Eventos y <em style={{ fontStyle: 'italic', color: 'var(--color-verde-claro)' }}>Festividades</em>
            </h2>
            <p style={{
              fontSize: '15px', color: 'rgba(var(--color-crema-rgb), 0.65)',
              fontWeight: 300, lineHeight: 1.75, maxWidth: '560px',
              margin: '0 auto',
            }}>
              Vive las celebraciones que dan vida y color a Chachagüí durante todo el año.
            </p>
          </div>
        </AnimarAlEntrar>

        {/* Grid de eventos 2x2 */}
        <div className="festi-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
          marginBottom: '64px',
        }}>
          {eventos.map((evento, i) => (
            <AnimarAlEntrar key={evento.id} direccion="arriba" delay={i * 80}>
              <Link
                href={`/festividades/${evento.slug}`}
                style={{
                  textDecoration: 'none',
                  background: 'rgba(var(--color-crema-rgb), 0.04)',
                  border: '1px solid rgba(var(--color-crema-rgb), 0.1)',
                  borderRadius: '18px',
                  padding: '28px',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'flex-start',
                  height: '100%',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(var(--color-crema-rgb), 0.07)'
                  e.currentTarget.style.borderColor = 'rgba(var(--color-verde-claro-rgb), 0.35)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(var(--color-crema-rgb), 0.04)'
                  e.currentTarget.style.borderColor = 'rgba(var(--color-crema-rgb), 0.1)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}>
                <div style={{
                  width: '64px', height: '64px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(var(--color-verde-claro-rgb), 0.18), rgba(var(--color-verde-claro-rgb), 0.18))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '32px',
                  flexShrink: 0,
                  border: '1px solid rgba(var(--color-verde-claro-rgb), 0.25)',
                }}>
                  {evento.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '10px', color: 'var(--color-verde-claro)',
                    fontWeight: 700, letterSpacing: '2px',
                    textTransform: 'uppercase', marginBottom: '8px',
                  }}>
                    {evento.fecha}
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-titulo)',
                    fontSize: '20px', fontWeight: 700,
                    color: 'var(--color-fondo)', marginBottom: '8px',
                    letterSpacing: '-0.3px',
                  }}>
                    {evento.titulo}
                  </h3>
                  <p style={{
                    fontSize: '13.5px',
                    color: 'rgba(var(--color-crema-rgb), 0.65)',
                    lineHeight: 1.6,
                  }}>
                    {evento.descripcion}
                  </p>
                </div>
              </Link>
            </AnimarAlEntrar>
          ))}
        </div>

        {/* Calendario */}
        <AnimarAlEntrar direccion="arriba" delay={200}>
          <div style={{
            background: 'rgba(var(--color-crema-rgb), 0.04)',
            border: '1px solid rgba(var(--color-crema-rgb), 0.1)',
            borderRadius: '20px',
            padding: '32px',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: '24px', flexWrap: 'wrap', gap: '12px',
            }}>
              <div>
                <div style={{
                  fontSize: '10px', color: 'var(--color-verde-claro)',
                  fontWeight: 700, letterSpacing: '2px',
                  textTransform: 'uppercase', marginBottom: '6px',
                }}>
                  Calendario
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-titulo)',
                  fontSize: '22px', fontWeight: 700,
                  color: 'var(--color-fondo)', letterSpacing: '-0.3px',
                }}>
                  Agenda anual
                </h3>
              </div>
              <span style={{
                fontSize: '12px',
                color: 'rgba(var(--color-crema-rgb), 0.5)',
              }}>
                Fechas aproximadas · sujetas a cambios
              </span>
            </div>

            <div className="cal-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
            }}>
              {calendarioEventos.map((c) => (
                <div key={c.mes} style={{
                  background: 'rgba(var(--color-crema-rgb), 0.05)',
                  border: '1px solid rgba(var(--color-crema-rgb), 0.08)',
                  borderRadius: '12px',
                  padding: '16px 14px',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(var(--color-verde-claro-rgb), 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(var(--color-verde-claro-rgb), 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(var(--color-crema-rgb), 0.05)'
                  e.currentTarget.style.borderColor = 'rgba(var(--color-crema-rgb), 0.08)'
                }}>
                  <div style={{
                    fontFamily: 'var(--font-titulo)',
                    fontSize: '20px', fontWeight: 800,
                    color: 'var(--color-verde-claro)', marginBottom: '4px',
                  }}>
                    {c.mes}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: 'rgba(var(--color-crema-rgb), 0.7)',
                    lineHeight: 1.3,
                  }}>
                    {c.evento}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimarAlEntrar>
      </div>

      <style>{`
        @media (max-width: 800px) {
          #festividades .festi-grid {
            grid-template-columns: 1fr !important;
          }
          #festividades .cal-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  )
}
