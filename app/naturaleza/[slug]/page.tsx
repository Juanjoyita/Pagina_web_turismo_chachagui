import Link from 'next/link'
import { notFound } from 'next/navigation'
import { naturaleza } from '@/data/naturaleza'

const coloresCat: Record<string, string> = {
  Reserva: '#4A7C59',
  Cascada: '#1a5a7a',
  Sendero: '#7a5a1a',
  Mirador: '#7a3a1a',
  Finca:   '#5a3a7a',
}

export default async function DetalleNaturaleza({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = naturaleza.find(n => n.slug === slug)
  if (!item) notFound()

  const color = coloresCat[item.categoria] || '#4A7C59'
  const relacionados = naturaleza
    .filter(n => n.categoria === item.categoria && n.slug !== slug)
    .slice(0, 3)

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

          <Link href="/#naturaleza" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            color: '#FAB511', fontSize: '13px', fontWeight: 600,
            textDecoration: 'none', marginBottom: '32px', opacity: 0.85,
          }}>
            ← Volver a Naturaleza
          </Link>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: `${color}22`,
            border: `1px solid ${color}44`,
            color: '#FAB511', fontSize: '10px', fontWeight: 700,
            letterSpacing: '3px', textTransform: 'uppercase',
            padding: '5px 14px', borderRadius: '30px', marginBottom: '20px',
          }}>
            🏞️ Naturaleza · {item.categoria}
          </div>

          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 800, color: '#FFFFFF',
            letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '16px',
          }}>
            {item.nombre}
          </h1>

          <p style={{
            fontSize: '16px', color: 'rgba(255,255,255,0.55)',
            fontWeight: 300, lineHeight: 1.8, maxWidth: '640px',
          }}>
            {item.descripcion}
          </p>

        </div>
      </div>

      {/* Contenido */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '64px 40px' }}>

        {/* Imagen */}
        <div style={{
          width: '100%', aspectRatio: '16/9',
          background: `linear-gradient(135deg, ${color}, #1C2316)`,
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

        {/* Info rápida */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px', marginBottom: '48px',
        }}>
          {[
            { label: 'Tipo',         valor: item.tipo },
            { label: 'Ubicación',    valor: item.ubicacion },
            { label: 'Actividades',  valor: item.actividades },
            { label: 'Categoría',    valor: item.categoria },
          ].map(info => (
            <div key={info.label} style={{
              background: '#FFFFFF', borderRadius: '14px', padding: '20px',
              borderTop: '1.5px solid #E8E0D4',
              borderRight: '1.5px solid #E8E0D4',
              borderBottom: '1.5px solid #E8E0D4',
              borderLeft: `4px solid ${color}`,
              boxShadow: '0 2px 10px rgba(28,35,22,0.05)',
            }}>
              <div style={{
                fontSize: '9px', fontWeight: 700, letterSpacing: '2px',
                textTransform: 'uppercase', color, marginBottom: '6px',
              }}>
                {info.label}
              </div>
              <div style={{ fontSize: '14px', color: '#1C2316', fontWeight: 600, lineHeight: 1.4 }}>
                {info.valor}
              </div>
            </div>
          ))}
        </div>

        {/* Descripción completa */}
        <div style={{ marginBottom: '52px' }}>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '24px', fontWeight: 700,
            color: '#1C2316', marginBottom: '20px',
          }}>
            Sobre este lugar
          </h2>
          <p style={{
            fontSize: '16px', color: 'rgba(28,35,22,0.72)',
            lineHeight: 1.9, fontWeight: 300,
          }}>
            {item.descripcion}
          </p>
        </div>

        {/* Relacionados */}
        {relacionados.length > 0 && (
          <div>
            <h3 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: '18px', fontWeight: 700,
              color: '#1C2316', marginBottom: '16px',
            }}>
              Otros lugares de {item.categoria.toLowerCase()}
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '14px',
            }}>
              {relacionados.map(rel => (
                <Link key={rel.slug} href={`/naturaleza/${rel.slug}`} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '14px 16px', borderRadius: '12px',
                  textDecoration: 'none', background: '#FFFFFF',
                  borderTop: '1.5px solid #E8E0D4',
                  borderRight: '1.5px solid #E8E0D4',
                  borderBottom: '1.5px solid #E8E0D4',
                  borderLeft: `4px solid ${color}`,
                  transition: 'opacity 0.2s',
                }}>
                  <span style={{ fontSize: '24px' }}>{rel.emoji}</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#1C2316', lineHeight: 1.3 }}>
                      {rel.nombre}
                    </div>
                    <div style={{ fontSize: '11px', color: 'rgba(28,35,22,0.45)', marginTop: '2px' }}>
                      {rel.ubicacion}
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