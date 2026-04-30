import { Suspense } from 'react'
import Hero from '@/components/Hero'
import ArteYCultura from '@/components/secciones/ArteYCultura'
import Aventura from '@/components/secciones/Aventura'
import Naturaleza from '@/components/secciones/Naturaleza'
import Gastronomia from '@/components/secciones/Gastronomia'
import Festividades from '@/components/secciones/Festividades'
import Servicios from '@/components/secciones/Servicios'

export default function Home() {
  return (
    <main>
      <Hero />
      <ArteYCultura />
      <Aventura />
      <Suspense fallback={null}>
        <Naturaleza />
      </Suspense>
      <Gastronomia />
      <Festividades />
      <Servicios />
    </main>
  )
}
