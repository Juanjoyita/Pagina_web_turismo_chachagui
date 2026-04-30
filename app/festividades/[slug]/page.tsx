import Link from 'next/link'
import { notFound } from 'next/navigation'
import { eventos } from '@/data/eventos'
import GaleriaNaturaleza from '@/components/GaleriaNaturaleza'

export async function generateStaticParams() {
  return eventos.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = eventos.find((e) => e.slug === slug)
  if (!item) return { title: 'No encontrado — Chachagüí' }
  return {
    title: `${item.titulo} — Festividades · Chachagüí`,
    description: item.descripcion,
  }
}

export default async function DetalleEvento({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = eventos.find((e) => e.slug === slug)
  if (!item) notFound()

  const otros = eventos.filter((e) => e.slug !== slug)

  return (
    <main style={{ paddingTop: '64px', background: 'var(--color-fondo)', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{
        background: 'var(--color-verde-oscuro)',
        backgroundImage:
          'radial-gradient(circle at 20% 30%, rgba(var(--color-verde-claro-rgb), 0.10) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(var(--color-verde-claro-rgb), 0.14) 0%, transparent 40%)',
        padding: '72px 0 80px',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 40px' }}>

          <Link href="/#festividades" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            color: 'var(--color-verde-claro)', fontSize: '13px', fontWeight: 600,
            textDecoration: 'none', marginBottom: '32px', opacity: 0.85,
          }}>
            ← Volver a Festividades
          </Link>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(var(--color-verde-claro-rgb), 0.12)',
            border: '1px solid rgba(var(--color-verde-claro-rgb), 0.25)',
            color: 'var(--color-verde-claro)', fontSize: '10px', fontWeight: 700,
            letterSpacing: '3px', textTransform: 'uppercase',
            padding: '5px 14px', borderRadius: '30px', marginBottom: '20px',
          }}>
            {item.emoji} Festividad · {item.fecha}
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

        {/* Galería de imágenes */}
        <GaleriaNaturaleza
          imagenes={item.imagenes}
          nombre={item.titulo}
          categoria="Festividad"
          tipo={item.fecha}
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
            Información del evento
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '20px',
          }}>
            {[
              { label: 'Fecha',     valor: item.fechaCompleta },
              { label: 'Lugar',     valor: item.lugar },
              { label: 'Duración',  valor: item.duracion },
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

        {/* Actividades */}
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
            Actividades destacadas
          </h3>
          <ul style={{
            listStyle: 'none', padding: 0, margin: 0,
            display: 'flex', flexDirection: 'column', gap: '12px',
          }}>
            {item.actividades.map((act) => (
              <li key={act} style={{
                display: 'flex', alignItems: 'flex-start', gap: '12px',
                fontSize: '14px', color: 'rgba(var(--color-verde-oscuro-rgb), 0.85)', lineHeight: 1.5,
              }}>
                <span style={{
                  width: '22px', height: '22px',
                  borderRadius: '50%',
                  background: 'rgba(var(--color-verde-claro-rgb), 0.18)',
                  color: 'var(--color-verde-claro)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: 700,
                  flexShrink: 0, marginTop: '1px',
                }}>★</span>
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Otros eventos */}
        {otros.length > 0 && (
          <div>
            <h3 style={{
              fontFamily: 'var(--font-titulo)',
              fontSize: '18px', fontWeight: 700,
              color: 'var(--color-verde-oscuro)', marginBottom: '16px',
            }}>
              Otros eventos del año
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '14px',
            }}>
              {otros.map((rel) => (
                <Link key={rel.id} href={`/festividades/${rel.slug}`} style={{
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
                    <div style={{ fontSize: '11px', color: 'rgba(var(--color-verde-oscuro-rgb), 0.5)' }}>
                      {rel.fecha}
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
