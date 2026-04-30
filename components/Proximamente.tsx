import Link from 'next/link'

interface Props {
  emoji: string
  badge: string
  titulo: string
  descripcion: string
  volverHref?: string
  volverLabel?: string
}

export default function Proximamente({
  emoji,
  badge,
  titulo,
  descripcion,
  volverHref = '/',
  volverLabel = 'Volver al inicio',
}: Props) {
  return (
    <main style={{ paddingTop: '64px', background: 'var(--color-fondo)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '96px 40px' }}>

        <Link href={volverHref} style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          color: 'var(--color-verde-oscuro)', fontSize: '13px', fontWeight: 600,
          textDecoration: 'none', marginBottom: '32px',
        }}>
          ← {volverLabel}
        </Link>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(var(--color-verde-claro-rgb), 0.1)', color: 'var(--color-verde-oscuro)',
          fontSize: '10px', fontWeight: 700, letterSpacing: '3px',
          textTransform: 'uppercase', padding: '6px 18px',
          borderRadius: '30px', marginBottom: '20px',
        }}>
          {emoji} {badge}
        </div>

        <h1 style={{
          fontFamily: 'var(--font-titulo)',
          fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800,
          color: 'var(--color-verde-oscuro)', letterSpacing: '-1px', marginBottom: '16px',
          lineHeight: 1.1,
        }}>
          {titulo}
        </h1>

        <p style={{
          fontSize: '16px', color: 'rgba(var(--color-verde-oscuro-rgb), 0.65)', fontWeight: 300,
          lineHeight: 1.85, maxWidth: '560px', marginBottom: '40px',
        }}>
          {descripcion}
        </p>

        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '40px',
          borderTop: '1.5px solid var(--color-borde)',
          borderRight: '1.5px solid var(--color-borde)',
          borderBottom: '1.5px solid var(--color-borde)',
          borderLeft: '5px solid var(--color-verde-claro)',
          boxShadow: '0 4px 20px rgba(var(--color-verde-oscuro-rgb), 0.06)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>🛠️</div>
          <h2 style={{
            fontFamily: 'var(--font-titulo)',
            fontSize: '22px', fontWeight: 700,
            color: 'var(--color-verde-oscuro)', margin: '0 0 8px',
          }}>
            Sección en construcción
          </h2>
          <p style={{
            fontSize: '14px', color: 'rgba(var(--color-verde-oscuro-rgb), 0.55)',
            margin: 0, lineHeight: 1.7,
          }}>
            Estamos recopilando la información para esta sección. Vuelve pronto.
          </p>
        </div>
      </div>
    </main>
  )
}
