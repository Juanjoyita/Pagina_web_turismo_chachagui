import Link from 'next/link'
import { notFound } from 'next/navigation'
import { servicios } from '@/data/servicios'

export async function generateStaticParams() {
  return servicios.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = servicios.find((s) => s.slug === slug)
  if (!item) return { title: 'No encontrado — Chachagüí' }
  return {
    title: `${item.titulo} — Servicios · Chachagüí`,
    description: item.descripcion,
  }
}

export default async function DetalleServicio({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = servicios.find((s) => s.slug === slug)
  if (!item) notFound()

  const otros = servicios.filter((s) => s.slug !== slug).slice(0, 5)

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

          <Link href="/servicios" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            color: 'var(--color-verde-claro)', fontSize: '13px', fontWeight: 600,
            textDecoration: 'none', marginBottom: '32px', opacity: 0.85,
          }}>
            ← Volver a Servicios
          </Link>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(var(--color-verde-claro-rgb), 0.12)',
            border: '1px solid rgba(var(--color-verde-claro-rgb), 0.25)',
            color: 'var(--color-verde-claro)', fontSize: '10px', fontWeight: 700,
            letterSpacing: '3px', textTransform: 'uppercase',
            padding: '5px 14px', borderRadius: '30px', marginBottom: '20px',
          }}>
            {item.emoji} Servicio Turístico
          </div>

          <h1 style={{
            fontFamily: 'var(--font-titulo)',
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 800, color: '#FFFFFF',
            letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '16px',
          }}>
            {item.titulo}
          </h1>

          <p style={{
            fontSize: '16px', color: 'rgba(255,255,255,0.6)',
            fontWeight: 300, lineHeight: 1.8, maxWidth: '640px',
          }}>
            {item.descripcion}
          </p>

        </div>
      </div>

      {/* Contenido */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '64px 40px' }}>

        <div style={{
          background: '#FFFFFF', borderRadius: '16px',
          padding: '32px', marginBottom: '52px',
          borderTop: '1.5px solid var(--color-borde)',
          borderRight: '1.5px solid var(--color-borde)',
          borderBottom: '1.5px solid var(--color-borde)',
          borderLeft: '5px solid var(--color-verde-claro)',
          boxShadow: '0 4px 20px rgba(var(--color-verde-oscuro-rgb), 0.06)',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-titulo)',
            fontSize: '20px', fontWeight: 700,
            color: 'var(--color-verde-oscuro)', margin: '0 0 20px',
          }}>
            ¿Qué incluye?
          </h2>
          <ul style={{
            listStyle: 'none', padding: 0, margin: 0,
            display: 'flex', flexDirection: 'column', gap: '12px',
          }}>
            {item.items.map((it) => (
              <li key={it} style={{
                display: 'flex', alignItems: 'flex-start', gap: '12px',
                fontSize: '14px',
                color: 'rgba(var(--color-verde-oscuro-rgb), 0.85)',
                lineHeight: 1.5,
              }}>
                <span style={{
                  width: '22px', height: '22px',
                  borderRadius: '50%',
                  background: 'rgba(var(--color-verde-claro-rgb), 0.15)',
                  color: 'var(--color-verde-oscuro)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: 700,
                  flexShrink: 0, marginTop: '1px',
                }}>✓</span>
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Otros servicios */}
        {otros.length > 0 && (
          <div>
            <h3 style={{
              fontFamily: 'var(--font-titulo)',
              fontSize: '18px', fontWeight: 700,
              color: 'var(--color-verde-oscuro)', marginBottom: '16px',
            }}>
              Otros servicios
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '14px',
            }}>
              {otros.map((rel) => (
                <Link key={rel.id} href={`/servicios/${rel.slug}`} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '14px 16px', borderRadius: '12px',
                  textDecoration: 'none', background: '#FFFFFF',
                  borderTop: '1.5px solid var(--color-borde)',
                  borderRight: '1.5px solid var(--color-borde)',
                  borderBottom: '1.5px solid var(--color-borde)',
                  borderLeft: '4px solid var(--color-verde-claro)',
                }}>
                  <span style={{ fontSize: '24px' }}>{rel.emoji}</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-verde-oscuro)', lineHeight: 1.3 }}>
                      {rel.titulo}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  )
}
