import TarjetaArte from '@/components/TarjetaArte'
import AnimarAlEntrar from '@/components/AnimarAlEntrar'

const subcategorias = [
  {
    id: 'historia',
    nombre: 'Historia',
    descripcion: 'Legado prehispánico e influencia española reflejada en la arquitectura y costumbres del municipio.',
    emoji: '📜',
    color: '#1a4a2e',
    colorClaro: 'rgba(26,74,46,0.08)',
  },
  {
    id: 'cultura',
    nombre: 'Cultura',
    descripcion: 'Vida rural, prácticas agrícolas y expresiones propias que definen la identidad de Chachagüí.',
    emoji: '🎭',
    color: '#b04a1a',
    colorClaro: 'rgba(176,74,26,0.08)',
  },
  {
    id: 'artesanias',
    nombre: 'Artesanías',
    descripcion: 'Tejidos en fique y tallado en madera elaborados por artesanos y artesanas de la región.',
    emoji: '🏺',
    color: '#7a3a8a',
    colorClaro: 'rgba(122,58,138,0.08)',
  },
  {
    id: 'tradiciones',
    nombre: 'Tradiciones',
    descripcion: 'Rituales y saberes ancestrales transmitidos de generación en generación en el municipio.',
    emoji: '🎨',
    color: '#1a5a7a',
    colorClaro: 'rgba(26,90,122,0.08)',
  },
]

export default function ArteYCultura() {
  return (
    <section
      id="arte"
      style={{
        padding: '100px 0',
        background: '#fdf6ec',
        backgroundImage: 'radial-gradient(circle, rgba(176,74,26,0.055) 1.5px, transparent 1.5px)',
        backgroundSize: '28px 28px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>

        {/* ── ENCABEZADO CENTRADO ── */}
        <AnimarAlEntrar direccion="arriba">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(176,74,26,0.1)', color: '#b04a1a',
              fontSize: '10px', fontWeight: 700, letterSpacing: '3px',
              textTransform: 'uppercase', padding: '6px 18px',
              borderRadius: '30px', marginBottom: '20px',
            }}>
              🎨 Sección 01
            </div>
            <h2 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800, color: '#1a4a2e',
              letterSpacing: '-1.5px', lineHeight: 1.05,
              marginBottom: '20px',
            }}>
              Arte y <em style={{ fontStyle: 'italic', color: '#b04a1a' }}>Cultura</em>
            </h2>
            <div style={{
              width: '60px', height: '4px',
              background: 'linear-gradient(90deg, #b04a1a, #d4920a)',
              borderRadius: '2px', margin: '0 auto 20px',
            }} />
            <p style={{
              fontSize: '16px', color: '#5a4030',
              fontWeight: 300, lineHeight: 1.8,
              maxWidth: '600px', margin: '0 auto',
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
                border: '2px solid rgba(176,74,26,0.18)',
              }} />
              <div style={{
                position: 'relative', zIndex: 1,
                width: '100%', height: '100%',
                minHeight: '480px',
                background: 'linear-gradient(160deg, #2a5a3a 0%, #1a4a2e 40%, #0d3020 100%)',
                borderRadius: '22px',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 24px 64px rgba(13,48,32,0.35)',
                overflow: 'hidden',
              }}>
                {/* Círculos decorativos */}
                <div style={{
                  position: 'absolute', top: '-60px', right: '-60px',
                  width: '240px', height: '240px', borderRadius: '50%',
                  background: 'rgba(212,146,10,0.1)',
                }} />
                <div style={{
                  position: 'absolute', bottom: '-40px', left: '-40px',
                  width: '180px', height: '180px', borderRadius: '50%',
                  background: 'rgba(74,184,96,0.08)',
                }} />
                <div style={{ position: 'relative', textAlign: 'center', zIndex: 2 }}>
                  <div style={{ fontSize: '80px', marginBottom: '16px' }}>🎨</div>
                  <p style={{
                    color: 'rgba(255,255,255,0.5)', fontSize: '12px',
                    letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600,
                  }}>
                    Foto próximamente
                  </p>
                </div>
              </div>

              {/* Badge 300+ */}
              <div style={{
                position: 'absolute', bottom: '-18px', right: '-18px', zIndex: 2,
                background: 'linear-gradient(135deg, #c4820a, #f0b020)',
                color: '#fff', fontWeight: 800,
                padding: '20px 24px', borderRadius: '20px',
                boxShadow: '0 12px 36px rgba(212,146,10,0.5)',
                textAlign: 'center', lineHeight: 1.15,
              }}>
                <span style={{ display: 'block', fontSize: '32px', fontWeight: 900, letterSpacing: '-1px' }}>
                  300+
                </span>
                <span style={{ fontSize: '11px', fontWeight: 600, opacity: 0.9, letterSpacing: '1px' }}>
                  AÑOS DE HISTORIA
                </span>
              </div>
            </div>
          </AnimarAlEntrar>

          {/* Cards derecha — cada una con delay escalonado */}
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