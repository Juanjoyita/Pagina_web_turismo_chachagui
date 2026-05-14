import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prestadores } from '@/data/prestadores'
import GaleriaNaturaleza from '@/components/GaleriaNaturaleza'

const categoriaColor: Record<string, string> = {
  Hospedaje:  '#5a3a7a',
  Naturaleza: 'var(--color-verde-claro)',
  Recreación: '#1a5a7a',
  Bienestar:  '#7a5a1a',
}

export async function generateStaticParams() {
  return prestadores.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = prestadores.find((p) => p.slug === slug)
  if (!item) return { title: 'No encontrado — Chachagüí' }
  return {
    title: `${item.nombre} — Servicios Turísticos · Chachagüí`,
    description: item.descripcion,
  }
}

export default async function DetallePrestador({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = prestadores.find((p) => p.slug === slug)
  if (!item) notFound()

  const color = categoriaColor[item.categoria] || 'var(--color-verde-claro)'

  const galeria = item.imagenes && item.imagenes.length > 0
    ? item.imagenes
    : [item.imagen]

  const portada = galeria[0]

  const relacionados = prestadores
    .filter((p) => p.slug !== slug)
    .slice(0, 3)

  return (
    <main style={{ paddingTop: '64px', background: 'var(--color-fondo)', minHeight: '100vh' }}>

      {/* Hero con imagen de fondo */}
      <div style={{
        position: 'relative',
        padding: '72px 0 80px',
        overflow: 'hidden',
        background: 'var(--color-verde-oscuro)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${portada})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.30,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background:
            'linear-gradient(to right, rgba(var(--color-verde-oscuro-rgb), 0.95) 0%, rgba(var(--color-verde-oscuro-rgb), 0.75) 60%, rgba(var(--color-verde-oscuro-rgb), 0.50) 100%)',
        }} />

        <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto', padding: '0 40px' }}>

          <Link href="/servicios" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            color: 'var(--color-verde-claro)', fontSize: '13px', fontWeight: 600,
            textDecoration: 'none', marginBottom: '32px', opacity: 0.85,
          }}>
            ← Volver a Servicios
          </Link>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: `${color}22`,
            border: `1px solid ${color}44`,
            color: 'var(--color-verde-claro)', fontSize: '10px', fontWeight: 700,
            letterSpacing: '3px', textTransform: 'uppercase',
            padding: '5px 14px', borderRadius: '30px', marginBottom: '20px',
          }}>
            {item.emoji} Servicios · {item.categoria}
          </div>

          <h1 style={{
            fontFamily: 'var(--font-titulo)',
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 800, color: '#FFFFFF',
            letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '10px',
          }}>
            {item.nombre}
          </h1>

          <p style={{
            fontSize: '13px', color: 'rgba(255,255,255,0.55)',
            fontWeight: 500, letterSpacing: '0.5px', marginBottom: '14px',
          }}>
            {item.tipo}
          </p>

          <p style={{
            fontSize: '16px', color: 'rgba(255,255,255,0.75)',
            fontWeight: 300, lineHeight: 1.8, maxWidth: '640px',
          }}>
            {item.descripcion}
          </p>

        </div>
      </div>

      {/* Contenido */}
      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '64px 40px' }}>

        {/* Galería */}
        <GaleriaNaturaleza
          imagenes={galeria}
          nombre={item.nombre}
          categoria={item.categoria}
          tipo={item.tipo}
        />

        {/* Info rápida */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px', marginBottom: '48px',
        }}>
          {[
            { label: 'Tipo',       valor: item.tipo },
            { label: 'Categoría', valor: item.categoria },
            { label: 'Ubicación', valor: item.ubicacion },
          ].map((info) => (
            <div key={info.label} style={{
              background: '#FFFFFF', borderRadius: '14px', padding: '20px',
              borderTop: '1.5px solid var(--color-borde)',
              borderRight: '1.5px solid var(--color-borde)',
              borderBottom: '1.5px solid var(--color-borde)',
              borderLeft: `4px solid ${color}`,
              boxShadow: '0 2px 10px rgba(var(--color-verde-oscuro-rgb), 0.05)',
            }}>
              <div style={{
                fontSize: '9px', fontWeight: 700, letterSpacing: '2px',
                textTransform: 'uppercase', color, marginBottom: '6px',
              }}>
                {info.label}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--color-verde-oscuro)', fontWeight: 600, lineHeight: 1.4 }}>
                {info.valor}
              </div>
            </div>
          ))}
        </div>

        {/* Descripción completa */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontFamily: 'var(--font-titulo)',
            fontSize: '24px', fontWeight: 700,
            color: 'var(--color-verde-oscuro)', marginBottom: '20px',
          }}>
            Sobre este lugar
          </h2>
          {(item.descripcionCompleta || item.descripcion)
            .split('\n\n')
            .map((parrafo, i) => (
              <p key={i} style={{
                fontSize: '16px', color: 'rgba(var(--color-verde-oscuro-rgb), 0.72)',
                lineHeight: 1.9, fontWeight: 300, marginBottom: '18px',
              }}>
                {parrafo}
              </p>
            ))}
        </div>

        {/* Actividades */}
        {item.actividades && item.actividades.length > 0 && (
          <div style={{
            background: '#FFFFFF', borderRadius: '16px', padding: '32px',
            marginBottom: '52px',
            borderTop: '1.5px solid var(--color-borde)',
            borderRight: '1.5px solid var(--color-borde)',
            borderBottom: '1.5px solid var(--color-borde)',
            borderLeft: `5px solid ${color}`,
            boxShadow: '0 4px 20px rgba(var(--color-verde-oscuro-rgb), 0.06)',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-titulo)',
              fontSize: '20px', fontWeight: 700,
              color: 'var(--color-verde-oscuro)', margin: '0 0 20px',
            }}>
              Experiencias y actividades
            </h2>
            <ul style={{
              listStyle: 'none', padding: 0, margin: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '12px',
            }}>
              {item.actividades.map((act) => (
                <li key={act} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '12px',
                  fontSize: '13.5px',
                  color: 'rgba(var(--color-verde-oscuro-rgb), 0.82)',
                  lineHeight: 1.5,
                }}>
                  <span style={{
                    width: '22px', height: '22px', borderRadius: '50%',
                    background: `${color}20`,
                    color: 'var(--color-verde-oscuro)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontWeight: 700, flexShrink: 0, marginTop: '1px',
                  }}>✓</span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Otros prestadores */}
        {relacionados.length > 0 && (
          <div>
            <h3 style={{
              fontFamily: 'var(--font-titulo)',
              fontSize: '18px', fontWeight: 700,
              color: 'var(--color-verde-oscuro)', marginBottom: '16px',
            }}>
              Otros servicios turísticos
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '14px',
            }}>
              {relacionados.map((rel) => (
                <Link key={rel.slug} href={`/servicios/${rel.slug}`} style={{
                  display: 'flex', flexDirection: 'column',
                  borderRadius: '14px', overflow: 'hidden',
                  textDecoration: 'none', background: '#FFFFFF',
                  borderTop: '1.5px solid var(--color-borde)',
                  borderRight: '1.5px solid var(--color-borde)',
                  borderBottom: '1.5px solid var(--color-borde)',
                  borderLeft: `4px solid ${categoriaColor[rel.categoria] || color}`,
                  boxShadow: '0 2px 10px rgba(var(--color-verde-oscuro-rgb), 0.05)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}>
                  <div style={{
                    width: '100%', aspectRatio: '4/3',
                    overflow: 'hidden', background: 'var(--color-verde-oscuro)',
                  }}>
                    <img
                      src={rel.imagen}
                      alt={rel.nombre}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <div style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: categoriaColor[rel.categoria] || color, marginBottom: '4px', letterSpacing: '0.5px' }}>
                      {rel.categoria}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-verde-oscuro)', lineHeight: 1.3 }}>
                      {rel.nombre}
                    </div>
                    <div style={{ fontSize: '11px', color: 'rgba(var(--color-verde-oscuro-rgb), 0.5)', marginTop: '4px' }}>
                      📍 {rel.ubicacion}
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
