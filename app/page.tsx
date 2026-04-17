import Hero from '@/components/Hero'
import ArteYCultura from '@/components/secciones/ArteYCultura'
import Aventura from '@/components/secciones/Aventura'
import Naturaleza from '@/components/secciones/Naturaleza'

export default function Home() {
  return (
    <main>
      <Hero />
      <ArteYCultura />
      <Aventura />
      <Naturaleza />
    </main>
  )
}