import Link from 'next/link'
import { notFound } from 'next/navigation'
import { naturaleza } from '@/data/naturaleza'
import GaleriaNaturaleza from '@/components/GaleriaNaturaleza'

const coloresCat: Record<string, string> = {
  Reserva: 'var(--color-verde-claro)',
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

  const color = coloresCat[item.categoria] || 'var(--color-verde-claro)'
  const relacionados = naturaleza
    .filter(n => n.categoria === item.categoria && n.slug !== slug)
    .slice(0, 3)

  const galeria = item.imagenes && item.imagenes.length > 0
    ? item.imagenes
    : [item.imagen]

  const portada = galeria[0]

  return (
    <main style={{ paddingTop: '64px', background: 'var(--color-fondo)', minHeight: '100vh' }}>

      {/* Hero con imagen de fondo */}
      <div style={{
        position: 'relative',
        padding: '72px 0 80px',
        overflow: 'hidden',
        background: 'var(--color-verde-oscuro)',
      }}>
        {/* Imagen de fondo del hero */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${portada})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.35,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background:
            'linear-gradient(to right, rgba(var(--color-verde-oscuro-rgb), 0.95) 0%, rgba(var(--color-verde-oscuro-rgb), 0.75) 60%, rgba(var(--color-verde-oscuro-rgb), 0.55) 100%)',
        }} />

        <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto', padding: '0 40px' }}>

          <Link href="/#naturaleza" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            color: 'var(--color-verde-claro)', fontSize: '13px', fontWeight: 600,
            textDecoration: 'none', marginBottom: '32px', opacity: 0.85,
          }}>
            ← Volver a Naturaleza
          </Link>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: `${color}22`,
            border: `1px solid ${color}44`,
            color: 'var(--color-verde-claro)', fontSize: '10px', fontWeight: 700,
            letterSpacing: '3px', textTransform: 'uppercase',
            padding: '5px 14px', borderRadius: '30px', marginBottom: '20px',
          }}>
            🏞️ Naturaleza · {item.categoria}
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
            fontSize: '16px', color: 'rgba(255,255,255,0.75)',
            fontWeight: 300, lineHeight: 1.8, maxWidth: '640px',
          }}>
            {item.descripcion}
          </p>

        </div>
      </div>

      {/* Contenido */}
      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '64px 40px' }}>

        {/* Galería principal con lightbox */}
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
            { label: 'Tipo',         valor: item.tipo },
            { label: 'Ubicación',    valor: item.ubicacion },
            { label: 'Actividades',  valor: item.actividades },
            { label: 'Categoría',    valor: item.categoria },
          ].map(info => (
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
        <div style={{ marginBottom: '52px' }}>
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

        {/* Relacionados */}
        {relacionados.length > 0 && (
          <div>
            <h3 style={{
              fontFamily: 'var(--font-titulo)',
              fontSize: '18px', fontWeight: 700,
              color: 'var(--color-verde-oscuro)', marginBottom: '16px',
            }}>
              Otros lugares de {item.categoria.toLowerCase()}
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '14px',
            }}>
              {relacionados.map(rel => (
                <Link key={rel.slug} href={`/naturaleza/${rel.slug}`} style={{
                  display: 'flex', flexDirection: 'column',
                  borderRadius: '14px', overflow: 'hidden',
                  textDecoration: 'none', background: '#FFFFFF',
                  borderTop: '1.5px solid var(--color-borde)',
                  borderRight: '1.5px solid var(--color-borde)',
                  borderBottom: '1.5px solid var(--color-borde)',
                  borderLeft: `4px solid ${color}`,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 2px 10px rgba(var(--color-verde-oscuro-rgb), 0.05)',
                }}>
                  <div style={{
                    width: '100%', aspectRatio: '4/3',
                    overflow: 'hidden', background: 'var(--color-verde-oscuro)',
                  }}>
                    <img
                      src={rel.imagen}
                      alt={rel.nombre}
                      loading="lazy"
                      style={{
                        width: '100%', height: '100%',
                        objectFit: 'cover', display: 'block',
                      }}
                    />
                  </div>
                  <div style={{ padding: '14px 16px' }}>
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
