import Link from 'next/link'
import { notFound } from 'next/navigation'
import { gastronomia } from '@/data/gastronomia'
import GaleriaNaturaleza from '@/components/GaleriaNaturaleza'

export async function generateStaticParams() {
  return gastronomia.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = gastronomia.find((g) => g.slug === slug)
  if (!item) return { title: 'No encontrado — Chachagüí' }
  return {
    title: `${item.nombre} — Gastronomía · Chachagüí`,
    description: item.descripcion,
  }
}

export default async function DetalleGastronomia({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = gastronomia.find((g) => g.slug === slug)
  if (!item) notFound()

  const otros = gastronomia.filter((g) => g.slug !== slug).slice(0, 5)

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

          <Link href="/#gastronomia" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            color: 'var(--color-verde-claro)', fontSize: '13px', fontWeight: 600,
            textDecoration: 'none', marginBottom: '32px', opacity: 0.85,
          }}>
            ← Volver a Gastronomía
          </Link>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(var(--color-verde-claro-rgb), 0.12)',
            border: '1px solid rgba(var(--color-verde-claro-rgb), 0.25)',
            color: 'var(--color-verde-claro)', fontSize: '10px', fontWeight: 700,
            letterSpacing: '3px', textTransform: 'uppercase',
            padding: '5px 14px', borderRadius: '30px', marginBottom: '20px',
          }}>
            {item.emoji} Gastronomía · {item.categoria}
          </div>

          <h1 style={{
            fontFamily: 'var(--font-titulo)',
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 800, color: '#FFFFFF',
            letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '16px',
          }}>
            {item.tituloCompleto || item.nombre}
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

        {/* Galería de imágenes */}
        <GaleriaNaturaleza
          imagenes={item.imagenes}
          nombre={item.nombre}
          categoria="Gastronomía"
          tipo={item.categoria}
        />

        {/* Descripción completa */}
        <div style={{ marginBottom: '52px' }}>
          {item.descripcionCompleta.split('\n\n').map((parrafo, i) => (
            <p key={i} style={{
              fontSize: '16px', color: 'rgba(var(--color-verde-oscuro-rgb), 0.72)',
              lineHeight: 1.9, fontWeight: 300, marginBottom: '20px',
            }}>
              {parrafo}
            </p>
          ))}
        </div>

        {/* Info card */}
        <div style={{
          background: '#FFFFFF', borderRadius: '16px',
          padding: '28px 32px', marginBottom: '32px',
          borderTop: '1.5px solid var(--color-borde)',
          borderRight: '1.5px solid var(--color-borde)',
          borderBottom: '1.5px solid var(--color-borde)',
          borderLeft: '5px solid var(--color-verde-claro)',
          boxShadow: '0 4px 20px rgba(var(--color-verde-oscuro-rgb), 0.06)',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-titulo)',
            fontSize: '18px', fontWeight: 700,
            color: 'var(--color-verde-oscuro)', margin: '0 0 20px',
          }}>
            Información del plato
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '20px',
          }}>
            {[
              { label: 'Categoría',     valor: item.categoria },
              { label: 'Origen',        valor: item.origen },
              { label: 'Recomendado',   valor: item.recomendado },
              { label: 'Precio aprox.', valor: item.precioAprox },
            ].map((info) => (
              <div key={info.label}>
                <div style={{
                  fontSize: '9px', fontWeight: 700, letterSpacing: '2px',
                  textTransform: 'uppercase', color: 'var(--color-verde-oscuro)', marginBottom: '6px',
                }}>
                  {info.label}
                </div>
                <div style={{ fontSize: '15px', color: 'var(--color-verde-oscuro)', fontWeight: 600 }}>
                  {info.valor}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ingredientes */}
        <div style={{
          background: '#FFFFFF', borderRadius: '16px',
          padding: '28px 32px', marginBottom: '52px',
          border: '1.5px solid var(--color-borde)',
          boxShadow: '0 4px 20px rgba(var(--color-verde-oscuro-rgb), 0.06)',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-titulo)',
            fontSize: '18px', fontWeight: 700,
            color: 'var(--color-verde-oscuro)', margin: '0 0 18px',
          }}>
            Ingredientes principales
          </h3>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '8px',
          }}>
            {item.ingredientes.map((ing) => (
              <span key={ing} style={{
                background: 'rgba(var(--color-verde-claro-rgb), 0.1)',
                color: 'var(--color-verde-oscuro)',
                fontSize: '13px', fontWeight: 600,
                padding: '8px 14px', borderRadius: '20px',
                border: '1px solid rgba(var(--color-verde-claro-rgb), 0.2)',
              }}>
                {ing}
              </span>
            ))}
          </div>
        </div>

        {/* Otros platos */}
        {otros.length > 0 && (
          <div>
            <h3 style={{
              fontFamily: 'var(--font-titulo)',
              fontSize: '18px', fontWeight: 700,
              color: 'var(--color-verde-oscuro)', marginBottom: '16px',
            }}>
              Otros platos
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '14px',
            }}>
              {otros.map((rel) => (
                <Link key={rel.id} href={`/gastronomia/${rel.slug}`} style={{
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
                      {rel.nombre}
                    </div>
                    <div style={{ fontSize: '11px', color: 'rgba(var(--color-verde-oscuro-rgb), 0.5)' }}>
                      {rel.categoria}
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
