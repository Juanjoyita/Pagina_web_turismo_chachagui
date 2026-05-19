'use client'

import TarjetaArte from '@/components/TarjetaArte'
import AnimarAlEntrar from '@/components/AnimarAlEntrar'

const subcategorias = [
  {
    id: 'historia',
    nombre: 'Historia',
    descripcion: 'Legado prehispánico e influencia española reflejada en la arquitectura y costumbres del municipio.',
    emoji: '📜',
    color: 'var(--color-verde-oscuro)',
    colorClaro: 'rgba(var(--color-verde-claro-rgb), 0.1)',
  },
  {
    id: 'cultura',
    nombre: 'Cultura',
    descripcion: 'Vida rural, prácticas agrícolas y expresiones propias que definen la identidad de Chachagüí.',
    emoji: '🎭',
    color: 'var(--color-verde-claro)',
    colorClaro: 'rgba(var(--color-verde-claro-rgb), 0.1)',
  },
  {
    id: 'artesanias',
    nombre: 'Artesanías',
    descripcion: 'Tejidos en fique y tallado en madera elaborados por artesanos y artesanas de la región.',
    emoji: '🏺',
    color: 'var(--color-verde-oscuro)',
    colorClaro: 'rgba(var(--color-verde-claro-rgb), 0.1)',
  },
  {
    id: 'tradiciones',
    nombre: 'Tradiciones',
    descripcion: 'Rituales y saberes ancestrales transmitidos de generación en generación en el municipio.',
    emoji: '🎨',
    color: 'var(--color-verde-claro)',
    colorClaro: 'rgba(var(--color-verde-claro-rgb), 0.1)',
  },
]

export default function ArteYCultura() {
  return (
    <section
      id="arte"
      style={{
        padding: '100px 0',
        background: 'var(--color-fondo)',
        backgroundImage: 'radial-gradient(circle, rgba(var(--color-verde-claro-rgb), 0.07) 1.5px, transparent 1.5px)',
        backgroundSize: '28px 28px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>

        {/* ── ENCABEZADO CENTRADO ── */}
        <AnimarAlEntrar direccion="arriba">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{
              fontFamily: 'var(--font-titulo)',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800, color: 'var(--color-verde-oscuro)',
              letterSpacing: '-1.5px', lineHeight: 1.05,
              marginBottom: '20px',
            }}>
              Arte y <em style={{ fontStyle: 'italic', color: 'var(--color-verde-oscuro)' }}>Cultura</em>
            </h2>
            <div style={{
              width: '60px', height: '4px',
              background: 'linear-gradient(90deg, var(--color-verde-claro), var(--color-verde-claro))',
              borderRadius: '2px', margin: '0 auto 20px',
            }} />
            <p style={{
              fontSize: '16px', color: 'var(--color-verde-oscuro)',
              fontWeight: 300, lineHeight: 1.8,
              maxWidth: '600px', margin: '0 auto',
              opacity: 0.7,
            }}>
              Chachagüí es un municipio con raíces profundas en la cultura andina
              del sur de Colombia. Sus tradiciones, artesanías y festividades
              reflejan siglos de historia nariñense.
            </p>
          </div>
        </AnimarAlEntrar>

        {/* ── LAYOUT PRINCIPAL ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: '48px',
          alignItems: 'stretch',
        }}>

          {/* Imagen izquierda */}
          <AnimarAlEntrar direccion="izquierda" delay={100}>
            <div style={{ position: 'relative', minHeight: '480px', height: '100%' }}>
              <div style={{
                position: 'absolute',
                top: '-12px', left: '-12px',
                width: '100%', height: '100%',
                borderRadius: '24px',
                border: '2px solid rgba(var(--color-verde-claro-rgb), 0.3)',
              }} />
              <div style={{
                position: 'relative', zIndex: 1,
                width: '100%', height: '100%',
                minHeight: '480px',
                borderRadius: '22px',
                overflow: 'hidden',
                boxShadow: '0 24px 64px rgba(var(--color-verde-oscuro-rgb), 0.35)',
              }}>
                {/* Foto casona */}
                <img
                  src="/imagenes/historia/HIS004.png"
                  alt="Casonas tradicionales de Chachagüí"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    position: 'absolute',
                    top: 0, left: 0,
                    display: 'block',
                  }}
                />
                {/* Overlay sutil para que el badge contraste */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 60%)',
                }} />
              </div>

              {/* Badge 300+ */}
              <div style={{
                position: 'absolute', bottom: '-18px', right: '-18px', zIndex: 2,
                background: 'linear-gradient(135deg, var(--color-verde-claro), var(--color-verde-claro-hover))',
                color: 'var(--color-verde-oscuro)', fontWeight: 800,
                padding: '20px 24px', borderRadius: '20px',
                boxShadow: '0 12px 36px rgba(var(--color-verde-claro-rgb), 0.45)',
                textAlign: 'center', lineHeight: 1.15,
              }}>
                <span style={{ display: 'block', fontSize: '32px', fontWeight: 900, letterSpacing: '-1px' }}>
                  300+
                </span>
                <span style={{ fontSize: '11px', fontWeight: 600, opacity: 0.8, letterSpacing: '1px' }}>
                  AÑOS DE HISTORIA
                </span>
              </div>
            </div>
          </AnimarAlEntrar>

          {/* Cards derecha */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            alignContent: 'stretch',
          }}>
            {subcategorias.map((sub, i) => (
              <AnimarAlEntrar
                key={sub.id}
                direccion="derecha"
                delay={150 + i * 80}
              >
                <TarjetaArte
                  id={sub.id}
                  nombre={sub.nombre}
                  descripcion={sub.descripcion}
                  emoji={sub.emoji}
                  badge=""
                  href={`/arte/${sub.id}`}
                  color={sub.color}
                  colorClaro={sub.colorClaro}
                />
              </AnimarAlEntrar>
            ))}
          </div>

        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          #arte > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          #arte > div > div:last-child > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}