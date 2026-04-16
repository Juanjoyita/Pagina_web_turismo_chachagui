'use client'

import { useState, useEffect } from 'react'

const slides = [
  {
    id: 'naturaleza',
    imagen: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=80&fit=crop',
    categoria: 'Naturaleza y Paisajes',
    titulo: 'Cascadas y Montañas',
    descripcion: 'Paisajes de niebla y ríos cristalinos',
  },
  {
    id: 'aventura',
    imagen: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80&fit=crop',
    categoria: 'Deporte y Aventura',
    titulo: 'Senderismo y Montañismo',
    descripcion: 'Rutas para todos los niveles',
  },
  {
    id: 'gastronomia',
    imagen: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80&fit=crop',
    categoria: 'Gastronomía Local',
    titulo: 'Sabores Nariñenses',
    descripcion: 'Empanadas de añejo, cuy y mucho más',
  },
  {
    id: 'festividades',
    imagen: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1600&q=80&fit=crop',
    categoria: 'Festividades',
    titulo: 'Ferias y Celebraciones',
    descripcion: 'Cultura viva en cada época del año',
  },
  {
    id: 'rutas',
    imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80&fit=crop',
    categoria: 'Rutas Turísticas',
    titulo: 'Recorridos Recomendados',
    descripcion: 'Itinerarios de 1 y 2 días',
  },
]

export default function Hero() {
  const [actual, setActual] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActual((prev) => (prev + 1) % slides.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [])

  const anterior = () => setActual((prev) => (prev - 1 + slides.length) % slides.length)
  const siguiente = () => setActual((prev) => (prev + 1) % slides.length)

  return (
    <section style={{
      position: 'relative',
      height: '100vh', minHeight: '600px',
      display: 'flex', alignItems: 'center',
      overflow: 'hidden', marginTop: '64px',
    }}>

      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${slide.imagen})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: i === actual ? 1 : 0,
            transition: 'opacity 1.4s ease',
            zIndex: i === actual ? 1 : 0,
          }}
        />
      ))}

      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(to right, rgba(28,35,22,0.92) 0%, rgba(28,35,22,0.55) 50%, rgba(28,35,22,0.2) 80%), linear-gradient(to top, rgba(28,35,22,0.95), rgba(28,35,22,0.3))',
      }} />

      {/* Info superior derecha */}
      <div style={{
        display: 'none',
        position: 'absolute', top: '96px', right: '40px', zIndex: 3,
        textAlign: 'right',
      }}
        className="md:block"
      >
        <span style={{ color: '#FAB511', fontSize: '11px', fontWeight: 700, letterSpacing: '2px' }}>
          {slides[actual].categoria}
        </span>
        <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '16px', marginTop: '4px' }}>
          {slides[actual].titulo}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '2px' }}>
          {slides[actual].descripcion}
        </div>
      </div>

      {/* Contenido principal */}
      <div style={{
        position: 'relative', zIndex: 3,
        padding: '0 24px', maxWidth: '860px',
        marginLeft: '0',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(250,181,17,0.15)',
          border: '1px solid rgba(250,181,17,0.35)',
          color: '#FAB511', fontSize: '11px', fontWeight: 700,
          letterSpacing: '2.5px', textTransform: 'uppercase',
          padding: '7px 18px', borderRadius: '30px', marginBottom: '20px',
        }}>
          🌿 Municipio de Chachagüí
        </div>

        <h1 style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: 'clamp(34px, 8vw, 80px)',
          fontWeight: 800, color: '#FFFFFF',
          lineHeight: 1.05, margin: '0 0 16px',
          letterSpacing: '-2px',
        }}>
          Tierra de{' '}
          <span style={{ color: '#FAB511' }}>Aventura,</span>
          <br />Cultura y Paisajes
        </h1>

        <p style={{
          color: 'rgba(255,255,255,0.65)', fontSize: '16px',
          maxWidth: '520px', lineHeight: 1.8,
          fontWeight: 300, margin: '0 0 28px',
        }}>
          Descubre la magia de Chachagüí: tradiciones ancestrales, paisajes
          de montaña y gastronomía única en el corazón de Nariño.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href="#naturaleza" style={{
            background: '#FAB511',
            color: '#1C2316', fontWeight: 800,
            padding: '14px 32px', borderRadius: '50px',
            textDecoration: 'none', fontSize: '14px',
            boxShadow: '0 8px 28px rgba(250,181,17,0.4)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}>
            Explorar Destino
          </a>
          <a href="#aventura" style={{
            border: '1.5px solid rgba(255,255,255,0.3)',
            color: '#FFFFFF', fontWeight: 600,
            padding: '14px 28px', borderRadius: '50px',
            textDecoration: 'none', fontSize: '14px',
          }}>
            Ver rutas →
          </a>
        </div>
      </div>

      {/* Stats abajo izquierda */}
      <div style={{
        position: 'absolute', bottom: '52px', left: '40px', zIndex: 3,
        display: 'flex', alignItems: 'center', gap: '24px',
      }}>
        {[
          { valor: '1.800m', label: 'Altitud' },
          { valor: '18°C',   label: 'Clima' },
          { valor: '7',      label: 'Categorías' },
        ].map((stat, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {i > 0 && (
              <div style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.15)' }} />
            )}
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#FAB511', lineHeight: 1 }}>
                {stat.valor}
              </div>
              <div style={{
                fontSize: '9px', color: 'rgba(255,255,255,0.4)',
                letterSpacing: '2px', textTransform: 'uppercase', marginTop: '3px',
              }}>
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controles abajo derecha */}
      <div style={{
        position: 'absolute', bottom: '52px', right: '40px', zIndex: 3,
        display: 'flex', gap: '10px',
      }}>
        {[{ fn: anterior, icon: '←' }, { fn: siguiente, icon: '→' }].map(({ fn, icon }) => (
          <button
            key={icon}
            onClick={fn}
            style={{
              width: '44px', height: '44px', borderRadius: '50%',
              border: '1.5px solid rgba(255,255,255,0.25)',
              background: 'rgba(255,255,255,0.06)',
              color: '#FFFFFF', fontSize: '16px',
              cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >
            {icon}
          </button>
        ))}
      </div>

      {/* Dots */}
      <div style={{
        position: 'absolute', bottom: '20px',
        left: '50%', transform: 'translateX(-50%)',
        zIndex: 3, display: 'flex', gap: '8px',
      }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActual(i)}
            style={{
              width: i === actual ? '28px' : '8px',
              height: '8px',
              borderRadius: i === actual ? '4px' : '50%',
              background: i === actual ? '#FAB511' : 'rgba(255,255,255,0.3)',
              border: 'none', cursor: 'pointer',
              transition: 'all 0.35s', padding: 0,
            }}
          />
        ))}
      </div>

    </section>
  )
}