import Link from 'next/link'
import { gastronomia } from '@/data/gastronomia'

export const metadata = {
  title: 'Platos típicos — Gastronomía · Chachagüí',
  description:
    'Descubre todos los platos típicos de Chachagüí: arepas de choclo, la boda, empanadas de añejo, cuy, guiso de maní y los helados artesanales.',
}

export default function PlatosPage() {
  return (
    <main style={{ paddingTop: '64px', background: 'var(--color-fondo)', minHeight: '100vh' }}>

      {/* Hero */}
      <div
        style={{
          background: 'var(--color-verde-oscuro)',
          backgroundImage:
            'radial-gradient(circle, rgba(var(--color-verde-claro-rgb), 0.12) 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
          padding: '72px 0 80px',
        }}
      >
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 40px' }}>

          <Link
            href="/#gastronomia"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--color-verde-claro)',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              marginBottom: '32px',
              opacity: 0.85,
            }}
          >
            ← Volver a Gastronomía
          </Link>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(var(--color-verde-claro-rgb), 0.12)',
              border: '1px solid rgba(var(--color-verde-claro-rgb), 0.25)',
              color: 'var(--color-verde-claro)',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              padding: '5px 14px',
              borderRadius: '30px',
              marginBottom: '20px',
            }}
          >
            🍽️ Sabores locales
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-titulo)',
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-1.5px',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}
          >
            Platos típicos de Chachagüí
          </h1>

          <p
            style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,0.6)',
              fontWeight: 300,
              lineHeight: 1.8,
              maxWidth: '700px',
            }}
          >
            Recorre todas las preparaciones tradicionales del municipio: desde
            la arepa de choclo y la boda hasta el cuy, las empanadas de añejo,
            el guiso de maní y los helados artesanales.
          </p>

        </div>
      </div>

      {/* Grilla de platos */}
      <div
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          padding: '64px 40px 96px',
        }}
      >
        <div
          className="platos-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {gastronomia.map((item) => (
            <Link
              key={item.id}
              href={`/gastronomia/${item.slug}`}
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                background: '#FFFFFF',
                borderRadius: '18px',
                overflow: 'hidden',
                borderTop: '1.5px solid var(--color-borde)',
                borderRight: '1.5px solid var(--color-borde)',
                borderBottom: '1.5px solid var(--color-borde)',
                borderLeft: '5px solid var(--color-verde-claro)',
                boxShadow: '0 4px 16px rgba(var(--color-verde-oscuro-rgb), 0.06)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  background: `url(${item.imagen}) center / cover`,
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(var(--color-verde-oscuro-rgb), 0.85)',
                    color: 'var(--color-verde-claro)',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  {item.emoji} {item.categoria}
                </span>
              </div>

              <div style={{ padding: '20px 22px 22px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-titulo)',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: 'var(--color-verde-oscuro)',
                    margin: '0 0 8px',
                    lineHeight: 1.25,
                  }}
                >
                  {item.nombre}
                </h3>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'rgba(var(--color-verde-oscuro-rgb), 0.65)',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    margin: '0 0 16px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {item.descripcion}
                </p>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--color-verde-oscuro)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                  }}
                >
                  Ver plato →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
