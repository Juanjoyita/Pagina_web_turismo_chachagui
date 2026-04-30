import Link from 'next/link'
import { notFound } from 'next/navigation'
import { aventura } from '@/data/aventura'
import GaleriaNaturaleza from '@/components/GaleriaNaturaleza'

export default async function DetalleAventura({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = aventura.find((a) => a.slug === slug)
  if (!item) notFound()

  return (
    <main style={{ paddingTop: '64px', background: 'var(--color-fondo)', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{
        background: 'var(--color-verde-oscuro)',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
        padding: '72px 0 80px',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 40px' }}>

          <Link href="/#aventura" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            color: 'var(--color-verde-claro)', fontSize: '13px', fontWeight: 600,
            textDecoration: 'none', marginBottom: '32px', opacity: 0.85,
          }}>
            ← Volver a Aventura
          </Link>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(var(--color-verde-claro-rgb), 0.12)',
            border: '1px solid rgba(var(--color-verde-claro-rgb), 0.25)',
            color: 'var(--color-verde-claro)', fontSize: '10px', fontWeight: 700,
            letterSpacing: '3px', textTransform: 'uppercase',
            padding: '5px 14px', borderRadius: '30px',
            marginBottom: '20px',
          }}>
            🚵 Aventura · {item.tag}
          </div>

          <h1 style={{
            fontFamily: 'var(--font-titulo)',
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 800, color: '#FFFFFF',
            letterSpacing: '-1.5px', lineHeight: 1.1,
            marginBottom: '16px',
          }}>
            {item.tituloCompleto}
          </h1>

          <p style={{
            fontSize: '16px', color: 'rgba(255,255,255,0.55)',
            fontWeight: 300, lineHeight: 1.8, maxWidth: '640px',
          }}>
            {item.descripcionCorta}
          </p>

        </div>
      </div>

      {/* Contenido */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '64px 40px' }}>

        {/* Galería de imágenes */}
        <GaleriaNaturaleza
          imagenes={item.imagenes}
          nombre={item.actividad}
          categoria="Aventura"
          tipo={item.tag}
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
          padding: '28px 32px', marginBottom: '52px',
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
            Información práctica
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '20px',
          }}>
            {[
              { label: 'Actividad',      valor: item.actividad },
              { label: 'Categoría',      valor: item.tag },
              { label: 'Disponibilidad', valor: 'Todo el año' },
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

        {/* Más actividades */}
        <h3 style={{
          fontFamily: 'var(--font-titulo)',
          fontSize: '18px', fontWeight: 700,
          color: 'var(--color-verde-oscuro)', marginBottom: '16px',
        }}>
          Más actividades
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '12px',
        }}>
          {aventura.map((a) => {
            const esActual = a.slug === slug
            return (
              <Link
                key={a.slug}
                href={`/aventura/${a.slug}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '12px 16px', borderRadius: '12px',
                  textDecoration: 'none',
                  background: esActual ? 'var(--color-verde-oscuro)' : '#FFFFFF',
                  borderTop: '1.5px solid var(--color-borde)',
                  borderRight: '1.5px solid var(--color-borde)',
                  borderBottom: '1.5px solid var(--color-borde)',
                  borderLeft: `4px solid ${esActual ? 'var(--color-verde-claro)' : 'var(--color-verde-claro)'}`,
                  opacity: esActual ? 1 : 0.85,
                  transition: 'opacity 0.2s',
                }}
              >
                <span style={{ fontSize: '20px' }}>{a.emoji}</span>
                <span style={{
                  fontSize: '12px', fontWeight: 600, lineHeight: 1.3,
                  color: esActual ? 'var(--color-verde-claro)' : 'var(--color-verde-oscuro)',
                }}>
                  {a.actividad}
                </span>
              </Link>
            )
          })}
        </div>

      </div>
    </main>
  )
}