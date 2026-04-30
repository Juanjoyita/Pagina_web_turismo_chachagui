import { Suspense } from 'react'
import NaturalezaCliente from '@/components/secciones/Naturaleza'

export const metadata = {
  title: 'Naturaleza y Paisajes — Chachagüí',
  description:
    'Cascadas, reservas naturales, senderos, miradores y fincas cafeteras de Chachagüí, Nariño.',
}

export default function NaturalezaPage() {
  return (
    <main style={{ paddingTop: '64px' }}>
      <Suspense fallback={null}>
        <NaturalezaCliente />
      </Suspense>
    </main>
  )
}
