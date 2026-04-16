'use client'

import AnimarAlEntrar from '@/components/AnimarAlEntrar'
import CardAventura from '@/components/CardAventura'
import { aventura } from '@/data/aventura'

export default function Aventura() {
  return (
    <section
      id="aventura"
      style={{
        padding: '100px 0',
        background: '#1C2316',
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>

        {/* Encabezado */}
        <AnimarAlEntrar direccion="arriba">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(250,181,17,0.12)', color: '#FAB511',
              fontSize: '10px', fontWeight: 700, letterSpacing: '3px',
              textTransform: 'uppercase', padding: '6px 18px',
              borderRadius: '30px', marginBottom: '20px',
            }}>
              🚵 Sección 02
            </div>
            <h2 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800, color: '#FFFFFF',
              letterSpacing: '-1.5px', lineHeight: 1.05,
              marginBottom: '20px',
            }}>
              Deporte y <em style={{ fontStyle: 'italic', color: '#FAB511' }}>Aventura</em>
            </h2>
            <div style={{
              width: '60px', height: '4px',
              background: 'linear-gradient(90deg, #4A7C59, #FAB511)',
              borderRadius: '2px', margin: '0 auto 20px',
            }} />
            <p style={{
              fontSize: '16px', color: 'rgba(255,255,255,0.5)',
              fontWeight: 300, lineHeight: 1.8,
              maxWidth: '600px', margin: '0 auto',
            }}>
              Para los amantes del deporte y la adrenalina, Chachagüí ofrece
              múltiples actividades en plena naturaleza andina.
            </p>
          </div>
        </AnimarAlEntrar>

        {/* Grid de actividades */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          marginBottom: '64px',
        }}>
          {aventura.map((item, i) => (
            <AnimarAlEntrar key={item.id} direccion="arriba" delay={i * 80}>
            <CardAventura
                slug={item.slug}
                actividad={item.actividad}
                descripcionCorta={item.descripcionCorta}
                emoji={item.emoji}
                tag={item.tag}
            />
            </AnimarAlEntrar>
          ))}
        </div>

        {/* Stats */}
        <AnimarAlEntrar direccion="arriba" delay={200}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(250,181,17,0.15)',
          }}>
            {[
              { valor: '6',           label: 'Actividades',      emoji: '🏃' },
              { valor: '300+',        label: 'Especies de aves', emoji: '🦜' },
              { valor: '3.200m',      label: 'Altitud máxima',   emoji: '⛰️' },
              { valor: 'Todo el año', label: 'Disponible',       emoji: '📅' },
            ].map((stat, i) => (
              <div key={i} style={{
                padding: '32px 24px',
                textAlign: 'center',
                background: 'rgba(255,255,255,0.02)',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.emoji}</div>
                <div style={{
                  fontSize: 'clamp(20px, 2.5vw, 28px)',
                  fontWeight: 800, color: '#FAB511',
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  lineHeight: 1, marginBottom: '6px',
                }}>
                  {stat.valor}
                </div>
                <div style={{
                  fontSize: '11px', color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600,
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
          #aventura > div > div:nth-child(2) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          #aventura > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
          #aventura > div > div:nth-child(3) > div {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  )
}