import Link from 'next/link'
import { notFound } from 'next/navigation'
import { aventura } from '@/data/aventura'

export default async function DetalleAventura({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = aventura.find((a) => a.slug === slug)
  if (!item) notFound()

  return (
    <main style={{ paddingTop: '64px', background: '#FFF6E6', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{
        background: '#1C2316',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
        padding: '72px 0 80px',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 40px' }}>

          <Link href="/#aventura" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            color: '#FAB511', fontSize: '13px', fontWeight: 600,
            textDecoration: 'none', marginBottom: '32px', opacity: 0.85,
          }}>
            ← Volver a Aventura
          </Link>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(250,181,17,0.12)',
            border: '1px solid rgba(250,181,17,0.25)',
            color: '#FAB511', fontSize: '10px', fontWeight: 700,
            letterSpacing: '3px', textTransform: 'uppercase',
            padding: '5px 14px', borderRadius: '30px',
            marginBottom: '20px',
          }}>
            🚵 Aventura · {item.tag}
          </div>

          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
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

        {/* Imagen */}
        <div style={{
          width: '100%', aspectRatio: '16/9',
          background: 'linear-gradient(135deg, #4A7C59, #1C2316)',
          borderRadius: '20px', marginBottom: '48px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 16px 48px rgba(28,35,22,0.15)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '-40px', right: '-40px',
            width: '200px', height: '200px', borderRadius: '50%',
            background: 'rgba(250,181,17,0.1)',
          }} />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: '80px', marginBottom: '12px' }}>{item.emoji}</div>
            <p style={{
              color: 'rgba(255,255,255,0.35)', fontSize: '11px',
              letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600,
            }}>
              Foto próximamente
            </p>
          </div>
        </div>

        {/* Descripción completa */}
        <div style={{ marginBottom: '52px' }}>
          {item.descripcionCompleta.split('\n\n').map((parrafo, i) => (
            <p key={i} style={{
              fontSize: '16px', color: 'rgba(28,35,22,0.72)',
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
          borderTop: '1.5px solid #E8E0D4',
          borderRight: '1.5px solid #E8E0D4',
          borderBottom: '1.5px solid #E8E0D4',
          borderLeft: '5px solid #4A7C59',
          boxShadow: '0 4px 20px rgba(28,35,22,0.06)',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '18px', fontWeight: 700,
            color: '#1C2316', margin: '0 0 20px',
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
                  textTransform: 'uppercase', color: '#4A7C59', marginBottom: '6px',
                }}>
                  {info.label}
                </div>
                <div style={{ fontSize: '15px', color: '#1C2316', fontWeight: 600 }}>
                  {info.valor}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Más actividades */}
        <h3 style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: '18px', fontWeight: 700,
          color: '#1C2316', marginBottom: '16px',
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
                  background: esActual ? '#1C2316' : '#FFFFFF',
                  borderTop: '1.5px solid #E8E0D4',
                  borderRight: '1.5px solid #E8E0D4',
                  borderBottom: '1.5px solid #E8E0D4',
                  borderLeft: `4px solid ${esActual ? '#FAB511' : '#4A7C59'}`,
                  opacity: esActual ? 1 : 0.85,
                  transition: 'opacity 0.2s',
                }}
              >
                <span style={{ fontSize: '20px' }}>{a.emoji}</span>
                <span style={{
                  fontSize: '12px', fontWeight: 600, lineHeight: 1.3,
                  color: esActual ? '#FAB511' : '#1C2316',
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