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

  const anterior = () =>
    setActual((prev) => (prev - 1 + slides.length) % slides.length)

  const siguiente = () =>
    setActual((prev) => (prev + 1) % slides.length)

  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden mt-16">

      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1400ms] ${
            i === actual ? 'opacity-100 z-10' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${slide.imagen})` }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 z-20 bg-[linear-gradient(to_right,rgba(13,48,32,0.9)_0%,rgba(13,48,32,0.4)_50%,transparent_80%),linear-gradient(to_top,rgba(13,48,32,0.95),rgba(13,48,32,0.3))]" />

      {/* Info superior derecha (solo desktop) */}
      <div className="hidden md:block absolute top-24 right-10 z-30 text-right">
        <span className="text-[#f0b020] text-xs font-bold tracking-wider">
          {slides[actual].categoria}
        </span>
        <div className="text-white font-bold">
          {slides[actual].titulo}
        </div>
        <div className="text-white/60 text-xs">
          {slides[actual].descripcion}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-30 px-6 md:px-20 max-w-4xl">

        <div className="inline-block bg-[#d4920a]/20 border border-[#d4920a]/40 text-[#f0b020] text-xs font-bold px-4 py-1 rounded-full mb-5">
          🌿 Municipio de Chachagüí
        </div>

        <h1 className="text-[clamp(34px,8vw,80px)] font-extrabold text-white leading-tight">
          Tierra de <span className="text-[#f0b020]">Aventura,</span>
          <br />
          Cultura y Paisajes
        </h1>

        <p className="mt-4 text-white/70 text-sm md:text-lg max-w-lg leading-relaxed">
          Descubre la magia de Chachagüí: tradiciones ancestrales, paisajes
          de montaña y gastronomía única en el corazón de Nariño.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <a
            href="#naturaleza"
            className="bg-[#f0b020] text-black font-bold px-6 py-3 rounded-full shadow-lg text-center"
          >
            Explorar Destino
          </a>

          <a
            href="#aventura"
            className="border border-white/30 text-white px-6 py-3 rounded-full text-center"
          >
            Ver rutas →
          </a>
        </div>
      </div>

      {/* Controles */}
      <div className="absolute bottom-12 right-10 z-30 flex gap-2">
        <button
          onClick={anterior}
          className="w-10 h-10 rounded-full border border-white/30 text-white flex items-center justify-center"
        >
          ←
        </button>
        <button
          onClick={siguiente}
          className="w-10 h-10 rounded-full border border-white/30 text-white flex items-center justify-center"
        >
          →
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActual(i)}
            className={`h-2 transition-all ${
              i === actual
                ? 'w-6 bg-[#f0b020] rounded-full'
                : 'w-2 bg-white/40 rounded-full'
            }`}
          />
        ))}
      </div>

    </section>
  )
}