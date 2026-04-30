import Link from 'next/link'

export default function TradicionesPage() {
  return (
    <main style={{ paddingTop: '64px', background: '#fdf6ec', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '64px 52px' }}>

        <Link href="/#arte" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          color: '#b04a1a', fontSize: '13px', fontWeight: 600,
          textDecoration: 'none', marginBottom: '32px',
        }}>
          ← Volver a Arte y Cultura
        </Link>

        <div style={{
          display: 'inline-block',
          background: 'rgba(176,74,26,0.12)', color: '#b04a1a',
          fontSize: '9px', fontWeight: 700, letterSpacing: '4px',
          textTransform: 'uppercase', padding: '5px 14px',
          borderRadius: '30px', marginBottom: '12px',
        }}>
          🎨 Arte y Cultura
        </div>

        <h1 style={{
          fontFamily: 'var(--font-titulo)',
          fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800,
          color: '#1a4a2e', letterSpacing: '-1px', marginBottom: '12px',
        }}>
          Tradiciones de Chachagüí
        </h1>
        <p style={{
          fontSize: '14px', color: '#5a4030', fontWeight: 300,
          lineHeight: 1.75, maxWidth: '520px', marginBottom: '56px',
        }}>
          Próximamente — estamos recopilando la información de las tradiciones del municipio.
        </p>

      </div>
    </main>
  )
}