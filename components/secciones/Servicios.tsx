'use client'

import Link from 'next/link'
import AnimarAlEntrar from '@/components/AnimarAlEntrar'
import { servicios } from '@/data/servicios'

export default function Servicios() {
  return (
    <section
      id="servicios"
      style={{
        padding: '100px 0',
        background: 'var(--color-fondo)',
      }}
    >
      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 40px' }}>

        {/* Encabezado */}
        <AnimarAlEntrar direccion="arriba">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{
              fontFamily: 'var(--font-titulo)',
              fontSize: 'clamp(28px, 4.5vw, 48px)',
              fontWeight: 800, color: 'var(--color-verde-oscuro)',
              letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '14px',
            }}>
              Servicios <em style={{ fontStyle: 'italic', color: 'var(--color-verde-oscuro)' }}>Turísticos</em>
            </h2>
            <p style={{
              fontSize: '15px', color: 'rgba(var(--color-verde-oscuro-rgb), 0.6)',
              fontWeight: 300, lineHeight: 1.75, maxWidth: '560px',
              margin: '0 auto',
            }}>
              Todo lo que necesitas para una experiencia inolvidable en Chachagüí, organizado y a tu disposición.
            </p>
          </div>
        </AnimarAlEntrar>

        {/* Grid 2x2 */}
        <div className="srv-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
          maxWidth: '880px',
          margin: '0 auto',
        }}>
          {servicios.map((srv, i) => (
            <AnimarAlEntrar key={srv.id} direccion="arriba" delay={i * 70}>
              <Link
                href={`/servicios/${srv.slug}`}
                style={{
                  textDecoration: 'none',
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '32px 28px',
                  border: '1.5px solid var(--color-borde)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s',
                  boxShadow: '0 2px 10px rgba(var(--color-verde-oscuro-rgb), 0.04)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(var(--color-verde-oscuro-rgb), 0.10)'
                  e.currentTarget.style.borderColor = 'var(--color-verde-claro)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(var(--color-verde-oscuro-rgb), 0.04)'
                  e.currentTarget.style.borderColor = 'var(--color-borde)'
                }}>
                <div style={{
                  width: '64px', height: '64px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(var(--color-verde-claro-rgb), 0.12), rgba(var(--color-verde-claro-rgb), 0.18))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '32px',
                  marginBottom: '20px',
                }}>
                  {srv.emoji}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-titulo)',
                  fontSize: '20px', fontWeight: 700,
                  color: 'var(--color-verde-oscuro)', marginBottom: '10px',
                  letterSpacing: '-0.3px',
                }}>
                  {srv.titulo}
                </h3>
                <p style={{
                  fontSize: '13.5px',
                  color: 'rgba(var(--color-verde-oscuro-rgb), 0.65)',
                  lineHeight: 1.6,
                  marginBottom: '20px',
                }}>
                  {srv.descripcion}
                </p>
                <ul style={{
                  listStyle: 'none', padding: 0, margin: 0,
                  display: 'flex', flexDirection: 'column', gap: '8px',
                  marginTop: 'auto',
                  paddingTop: '16px',
                  borderTop: '1px solid #F0EAE0',
                }}>
                  {srv.items.map((it) => (
                    <li key={it} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '10px',
                      fontSize: '13px',
                      color: 'rgba(var(--color-verde-oscuro-rgb), 0.75)',
                    }}>
                      <span style={{
                        width: '18px', height: '18px',
                        borderRadius: '50%',
                        background: 'rgba(var(--color-verde-claro-rgb), 0.15)',
                        color: 'var(--color-verde-oscuro)',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '11px', fontWeight: 700,
                        flexShrink: 0, marginTop: '1px',
                      }}>✓</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </Link>
            </AnimarAlEntrar>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          #servicios .srv-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
