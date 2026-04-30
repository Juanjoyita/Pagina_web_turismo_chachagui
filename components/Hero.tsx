'use client'

import { useState, useEffect, useRef } from 'react'
import { heroVideo, heroImagen } from '@/lib/imagenes'

type Slide = {
  id: string
  tipo: 'video' | 'imagen'
  src: string
  poster?: string
  categoria: string
  titulo: string
  descripcion: string
}

const slides: Slide[] = [
  {
    id: 'naturaleza-video',
    tipo: 'video',
    src: heroVideo(1).video,
    poster: heroVideo(1).poster,
    categoria: 'Naturaleza y Paisajes',
    titulo: 'Cascadas y Montañas',
    descripcion: 'Paisajes de niebla y ríos cristalinos',
  },
  {
    id: 'aventura-imagen',
    tipo: 'imagen',
    src: heroImagen(1),
    categoria: 'Deporte y Aventura',
    titulo: 'Senderismo y Montañismo',
    descripcion: 'Rutas para todos los niveles',
  },
  {
    id: 'bosque-video',
    tipo: 'video',
    src: heroVideo(2).video,
    poster: heroVideo(2).poster,
    categoria: 'Bosque Andino',
    titulo: 'Reservas y Biodiversidad',
    descripcion: 'Ecosistemas únicos del sur de Colombia',
  },
  {
    id: 'gastronomia-imagen',
    tipo: 'imagen',
    src: heroImagen(2),
    categoria: 'Gastronomía Local',
    titulo: 'Sabores Nariñenses',
    descripcion: 'Empanadas de añejo, cuy y mucho más',
  },
  {
    id: 'rutas-imagen',
    tipo: 'imagen',
    src: heroImagen(3),
    categoria: 'Rutas Turísticas',
    titulo: 'Recorridos Recomendados',
    descripcion: 'Itinerarios de 1 y 2 días',
  },
  {
    id: 'cultura-imagen',
    tipo: 'imagen',
    src: heroImagen(4),
    categoria: 'Cultura y Tradición',
    titulo: 'Ferias y Celebraciones',
    descripcion: 'Cultura viva en cada época del año',
  },
]

export default function Hero() {
  const [actual, setActual] = useState(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    // Para slides de imagen: 5.5s. Para slides de video: 8s.
    const duracion = slides[actual].tipo === 'video' ? 8000 : 5500
    const timer = setTimeout(() => {
      setActual((prev) => (prev + 1) % slides.length)
    }, duracion)
    return () => clearTimeout(timer)
  }, [actual])

  // Reproducir el video del slide actual y pausar los demás
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === actual) {
        v.currentTime = 0
        v.play().catch(() => {})
      } else {
        v.pause()
      }
    })
  }, [actual])

  const anterior = () => setActual((prev) => (prev - 1 + slides.length) % slides.length)
  const siguiente = () => setActual((prev) => (prev + 1) % slides.length)

  return (
    <section style={{
      position: 'relative',
      height: '100vh', minHeight: '600px',
      display: 'flex',
      alignItems: 'flex-end',          // contenido alineado abajo
      overflow: 'hidden', marginTop: '64px',
      paddingBottom: '180px',          // sube un poco el bloque de texto
    }}>

      {/* Slides (video o imagen) */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          style={{
            position: 'absolute', inset: 0,
            opacity: i === actual ? 1 : 0,
            transition: 'opacity 1.4s ease',
            zIndex: i === actual ? 1 : 0,
          }}
        >
          {slide.tipo === 'video' ? (
            <video
              ref={(el) => { videoRefs.current[i] = el }}
              src={slide.src}
              poster={slide.poster}
              muted
              playsInline
              loop
              preload="metadata"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          ) : (
            <div
              style={{
                width: '100%', height: '100%',
                backgroundImage: `url(${slide.src})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
              }}
            />
          )}
        </div>
      ))}

      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(to top, rgba(var(--color-verde-oscuro-rgb), 0.95) 0%, rgba(var(--color-verde-oscuro-rgb), 0.55) 55%, rgba(var(--color-verde-oscuro-rgb), 0.2) 100%)',
      }} />

      {/* Contenido principal (alineado abajo-izquierda) */}
      <div style={{
        position: 'relative', zIndex: 3,
        padding: '0 40px', maxWidth: '900px',
        marginLeft: '0',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(var(--color-verde-claro-rgb), 0.15)',
          border: '1px solid rgba(var(--color-verde-claro-rgb), 0.35)',
          color: 'var(--color-verde-claro)', fontSize: '11px', fontWeight: 700,
          letterSpacing: '2.5px', textTransform: 'uppercase',
          padding: '7px 18px', borderRadius: '30px', marginBottom: '20px',
        }}>
          🌿 Municipio de Chachagüí
        </div>

        <h1 style={{
          fontFamily: 'var(--font-titulo)',
          fontSize: 'clamp(34px, 8vw, 80px)',
          fontWeight: 800, color: '#FFFFFF',
          lineHeight: 1.05, margin: '0 0 16px',
          letterSpacing: '-2px',
        }}>
          Tierra de{' '}
          <span style={{ color: 'var(--color-verde-claro)' }}>Aventura,</span>
          <br />Cultura y Paisajes
        </h1>

        <p style={{
          color: 'rgba(255,255,255,0.75)', fontSize: '16px',
          maxWidth: '520px', lineHeight: 1.8,
          fontWeight: 300, margin: '0 0 28px',
        }}>
          Descubre la magia de Chachagüí: tradiciones ancestrales, paisajes
          de montaña y gastronomía única en el corazón de Nariño.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a
            href="#naturaleza"
            className="hero-cta"
            style={{
              background: 'var(--color-verde-claro)',
              color: 'var(--color-verde-oscuro)', fontWeight: 800,
              padding: '14px 32px', borderRadius: '50px',
              textDecoration: 'none', fontSize: '14px',
              boxShadow: '0 8px 28px rgba(var(--color-verde-claro-rgb), 0.4)',
              transition: 'transform 0.25s ease, box-shadow 0.3s ease, background 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              display: 'inline-block',
            }}
          >
            Explorar Destino
          </a>
        </div>
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
        {slides.map((slide, i) => (
          <button
            key={i}
            onClick={() => setActual(i)}
            aria-label={`Ir al slide ${i + 1} (${slide.tipo})`}
            style={{
              width: i === actual ? '28px' : '8px',
              height: '8px',
              borderRadius: i === actual ? '4px' : '50%',
              background: i === actual ? 'var(--color-verde-claro)' : 'rgba(255,255,255,0.3)',
              border: 'none', cursor: 'pointer',
              transition: 'all 0.35s', padding: 0,
            }}
          />
        ))}
      </div>

      {/* Brillo + glow del CTA "Explorar Destino" */}
      <style>{`
        .hero-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: -85%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255,255,255,0.55) 50%,
            transparent 100%
          );
          transform: skewX(-20deg);
          transition: left 0.7s ease;
          pointer-events: none;
        }
        .hero-cta:hover {
          transform: translateY(-2px);
          background: var(--color-verde-claro-hover) !important;
          box-shadow:
            0 0 0 4px rgba(var(--color-verde-claro-rgb), 0.20),
            0 10px 30px rgba(var(--color-verde-claro-rgb), 0.55),
            0 0 36px rgba(var(--color-verde-claro-rgb), 0.65);
        }
        .hero-cta:hover::before {
          left: 130%;
        }
      `}</style>

    </section>
  )
}
