import Link from 'next/link'
import { notFound } from 'next/navigation'
import { aventura } from '@/data/aventura'

export default function DetalleAventura({ params }: { params: { id: string } }) {
  const item = aventura.find(a => a.id === params.id)
  if (!item) notFound()

  return (
    <main style={{ paddingTop: '64px', background: '#fdf6ec', minHeight: '100vh' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '64px 52px' }}>

        <Link href="/#aventura" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          color: '#2a7a4a', fontSize: '13px', fontWeight: 600,
          textDecoration: 'none', marginBottom: '32px',
        }}>
          ← Volver a Aventura
        </Link>

        <div style={{
          display: 'inline-block',
          background: 'rgba(42,122,74,0.1)', color: '#2a7a4a',
          fontSize: '9px', fontWeight: 700, letterSpacing: '4px',
          textTransform: 'uppercase', padding: '5px 14px',
          borderRadius: '30px', marginBottom: '16px',
        }}>
          🚵 Aventura
        </div>

        <h1 style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 800, color: '#1a4a2e',
          letterSpacing: '-1px', marginBottom: '16px', lineHeight: 1.1,
        }}>
          {item.tituloCompleto}
        </h1>

        <span style={{
          display: 'inline-block',
          background: 'rgba(74,184,96,0.1)', color: '#2a7a4a',
          fontSize: '11px', fontWeight: 600,
          padding: '4px 12px', borderRadius: '20px', marginBottom: '32px',
        }}>
          {item.tag}
        </span>

        {/* Imagen placeholder */}
        <div style={{
          width: '100%', aspectRatio: '16/9',
          background: 'linear-gradient(135deg, #1a4a2e, #0d3020)',
          borderRadius: '20px', marginBottom: '40px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '80px',
        }}>
          {item.emoji}
        </div>

        {/* Descripción */}
        <div style={{ fontSize: '16px', color: '#3a2010', lineHeight: 1.85, fontWeight: 300 }}>
          {item.descripcionCompleta.split('\n\n').map((parrafo, i) => (
            <p key={i} style={{ marginBottom: '20px' }}>{parrafo}</p>
          ))}
        </div>

      </div>
    </main>
  )
}