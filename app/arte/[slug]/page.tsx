import Link from 'next/link'
import { notFound } from 'next/navigation'
import { todosArte } from '@/data/historia'
import GaleriaNaturaleza from '@/components/GaleriaNaturaleza'

export async function generateStaticParams() {
  return todosArte.map((item) => ({ slug: item.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = todosArte.find((i) => i.id === slug)
  if (!item) return { title: 'No encontrado — Chachagüí' }
  return {
    title: `${item.nombre} — Arte y Cultura · Chachagüí`,
    description: item.descripcion,
  }
}

export default async function DetalleArte({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = todosArte.find((i) => i.id === slug)
  if (!item) notFound()

  // Sección a la que se debe volver
  const subRuta = item.subcategoria.toLowerCase() // historia | cultura | artesanías
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quita acentos

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

          <Link href={`/arte/${subRuta}`} style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            color: 'var(--color-verde-claro)', fontSize: '13px', fontWeight: 600,
            textDecoration: 'none', marginBottom: '32px', opacity: 0.85,
          }}>
            ← Volver a {item.subcategoria}
          </Link>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(var(--color-verde-claro-rgb), 0.12)',
            border: '1px solid rgba(var(--color-verde-claro-rgb), 0.25)',
            color: 'var(--color-verde-claro)', fontSize: '10px', fontWeight: 700,
            letterSpacing: '3px', textTransform: 'uppercase',
            padding: '5px 14px', borderRadius: '30px', marginBottom: '20px',
          }}>
            {item.emoji} {item.subcategoria} {item.badge ? ` · ${item.badge}` : ''}
          </div>

          <h1 style={{
            fontFamily: 'var(--font-titulo)',
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 800, color: '#FFFFFF',
            letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '16px',
          }}>
            {('tituloCompleto' in item && item.tituloCompleto) ? item.tituloCompleto : item.nombre}
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
        {('imagenes' in item && Array.isArray(item.imagenes) && item.imagenes.length > 0) ? (
          <GaleriaNaturaleza
            imagenes={item.imagenes}
            nombre={item.nombre}
            categoria="Arte y Cultura"
            tipo={item.subcategoria}
          />
        ) : (
          <div style={{
            width: '100%', aspectRatio: '16/9',
            background: 'linear-gradient(135deg, var(--color-verde-claro), var(--color-verde-oscuro))',
            borderRadius: '20px', marginBottom: '48px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 16px 48px rgba(var(--color-verde-oscuro-rgb), 0.15)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ fontSize: '80px' }}>{item.emoji}</div>
          </div>
        )}

        {/* Descripción completa */}
        {('descripcionCompleta' in item && item.descripcionCompleta) && (
          <div style={{ marginBottom: '52px' }}>
            <h2 style={{
              fontFamily: 'var(--font-titulo)',
              fontSize: '24px', fontWeight: 700,
              color: 'var(--color-verde-oscuro)', marginBottom: '20px',
            }}>
              Sobre este tema
            </h2>
            {item.descripcionCompleta.split('\n\n').map((parrafo: string, i: number) => (
              <p key={i} style={{
                fontSize: '16px', color: 'rgba(var(--color-verde-oscuro-rgb), 0.72)',
                lineHeight: 1.9, fontWeight: 300, marginBottom: '18px',
              }}>
                {parrafo}
              </p>
            ))}
          </div>
        )}

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
            Información
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '20px',
          }}>
            {[
              { label: 'Categoría', valor: item.subcategoria },
              ...(item.badge ? [{ label: item.subcategoria === 'Artesanías' ? 'Material' : 'Año', valor: item.badge }] : []),
              ...(('artesano' in item && item.artesano) ? [{ label: 'Artesano', valor: item.artesano }] : []),
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

        {/* Otros items de la misma subcategoría */}
        {(() => {
          const relacionados = todosArte
            .filter((i) => i.subcategoria === item.subcategoria && i.id !== item.id)
            .slice(0, 4)
          if (relacionados.length === 0) return null
          return (
            <div>
              <h3 style={{
                fontFamily: 'var(--font-titulo)',
                fontSize: '18px', fontWeight: 700,
                color: 'var(--color-verde-oscuro)', marginBottom: '16px',
              }}>
                Más de {item.subcategoria}
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '14px',
              }}>
                {relacionados.map((rel) => (
                  <Link key={rel.id} href={`/arte/${rel.id}`} style={{
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
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })()}

      </div>
    </main>
  )
}
