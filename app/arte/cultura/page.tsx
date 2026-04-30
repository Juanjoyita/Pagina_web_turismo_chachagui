import Link from 'next/link'
import { cultura } from '@/data/historia'

export default function CulturaPage() {
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
          🎭 Arte y Cultura
        </div>

        <h1 style={{
          fontFamily: 'var(--font-titulo)',
          fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800,
          color: '#1a4a2e', letterSpacing: '-1px', marginBottom: '12px',
        }}>
          Cultura de Chachagüí
        </h1>
        <p style={{
          fontSize: '14px', color: '#5a4030', fontWeight: 300,
          lineHeight: 1.75, maxWidth: '520px', marginBottom: '56px',
        }}>
          Expresiones culturales y tradiciones que definen el carácter único de Chachagüí.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {cultura.map(item => (
            <Link key={item.id} href={`/arte/${item.id}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#fff', borderRadius: '16px',
                border: '1.5px solid #e8d8c0', borderLeft: '4px solid #2a7a4a',
                padding: '24px', cursor: 'pointer',
              }}>
                <span style={{ fontSize: '32px' }}>🎨</span>
                <h3 style={{
                  fontFamily: 'var(--font-titulo)',
                  fontSize: '18px', fontWeight: 700,
                  color: '#1a4a2e', margin: '12px 0 8px',
                }}>
                  {item.nombre}
                </h3>
                <p style={{ fontSize: '13px', color: '#5a4030', lineHeight: 1.65, margin: 0 }}>
                  {item.descripcion}
                </p>
                <span style={{
                  display: 'inline-block', marginTop: '16px',
                  fontSize: '12px', color: '#b04a1a', fontWeight: 700,
                }}>
                  Ver detalle →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}