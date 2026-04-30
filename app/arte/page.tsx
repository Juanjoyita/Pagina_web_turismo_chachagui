import Link from 'next/link'

const subcategorias = [
  {
    slug: 'historia',
    nombre: 'Historia',
    descripcion:
      'Legado prehispánico e influencia española reflejados en la arquitectura, la geografía y las costumbres del municipio.',
    emoji: '📜',
  },
  {
    slug: 'cultura',
    nombre: 'Cultura',
    descripcion:
      'Vida rural, prácticas agrícolas y expresiones propias que definen la identidad chachagüense.',
    emoji: '🎭',
  },
  {
    slug: 'artesanias',
    nombre: 'Artesanías',
    descripcion:
      'Tejidos en fique y tallado en madera elaborados por artesanos de la región.',
    emoji: '🏺',
  },
  {
    slug: 'tradiciones',
    nombre: 'Tradiciones',
    descripcion:
      'Rituales y saberes ancestrales transmitidos de generación en generación.',
    emoji: '🎨',
  },
]

export const metadata = {
  title: 'Arte y Cultura — Chachagüí',
  description:
    'Explora la historia, la cultura, las artesanías y las tradiciones del municipio de Chachagüí, en Nariño.',
}

export default function ArteIndexPage() {
  return (
    <main style={{ paddingTop: '64px', background: 'var(--color-fondo)', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{
        background: 'var(--color-verde-oscuro)',
        backgroundImage:
          'radial-gradient(circle, rgba(var(--color-verde-claro-rgb), 0.12) 1.5px, transparent 1.5px)',
        backgroundSize: '28px 28px',
        padding: '72px 0 80px',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 40px' }}>

          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            color: 'var(--color-verde-claro)', fontSize: '13px', fontWeight: 600,
            textDecoration: 'none', marginBottom: '32px', opacity: 0.85,
          }}>
            ← Volver al inicio
          </Link>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(var(--color-verde-claro-rgb), 0.12)',
            border: '1px solid rgba(var(--color-verde-claro-rgb), 0.25)',
            color: 'var(--color-verde-claro)', fontSize: '10px', fontWeight: 700,
            letterSpacing: '3px', textTransform: 'uppercase',
            padding: '5px 14px', borderRadius: '30px', marginBottom: '20px',
          }}>
            🎨 Arte y Cultura
          </div>

          <h1 style={{
            fontFamily: 'var(--font-titulo)',
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 800, color: '#FFFFFF',
            letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '16px',
          }}>
            Arte y <em style={{ fontStyle: 'italic', color: 'var(--color-verde-claro)' }}>Cultura</em>
          </h1>

          <p style={{
            fontSize: '16px', color: 'rgba(255,255,255,0.6)',
            fontWeight: 300, lineHeight: 1.8, maxWidth: '640px',
          }}>
            Chachagüí es un municipio con raíces profundas en la cultura andina del sur
            de Colombia. Recorre sus cuatro grandes ejes culturales.
          </p>

        </div>
      </div>

      {/* Grid de subcategorías */}
      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '64px 40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
        }}>
          {subcategorias.map((sub) => (
            <Link
              key={sub.slug}
              href={`/arte/${sub.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                background: '#FFFFFF', borderRadius: '20px',
                padding: '28px 24px', height: '100%',
                borderTop: '1.5px solid var(--color-borde)',
                borderRight: '1.5px solid var(--color-borde)',
                borderBottom: '1.5px solid var(--color-borde)',
                borderLeft: '5px solid var(--color-verde-claro)',
                boxShadow: '0 2px 12px rgba(var(--color-verde-oscuro-rgb), 0.05)',
                display: 'flex', flexDirection: 'column', gap: '12px',
                cursor: 'pointer',
              }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '14px',
                  background: 'rgba(var(--color-verde-claro-rgb), 0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '24px',
                }}>
                  {sub.emoji}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-titulo)',
                  fontSize: '18px', fontWeight: 700,
                  color: 'var(--color-verde-oscuro)', margin: 0, lineHeight: 1.2,
                }}>
                  {sub.nombre}
                </h3>
                <p style={{
                  fontSize: '13px', color: 'rgba(var(--color-verde-oscuro-rgb), 0.6)',
                  lineHeight: 1.7, margin: 0, flex: 1, fontWeight: 300,
                }}>
                  {sub.descripcion}
                </p>
                <div style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', marginTop: '4px',
                }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-verde-oscuro)', fontWeight: 700 }}>
                    Explorar
                  </span>
                  <div style={{
                    width: '30px', height: '30px', borderRadius: '50%',
                    background: 'rgba(var(--color-verde-claro-rgb), 0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', color: 'var(--color-verde-oscuro)',
                  }}>
                    →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
