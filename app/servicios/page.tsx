import Servicios from '@/components/secciones/Servicios'

export const metadata = {
  title: 'Servicios Turísticos — Chachagüí',
  description:
    'Hospedaje, guías, transporte, restaurantes y paquetes turísticos en Chachagüí, Nariño.',
}

export default function ServiciosPage() {
  return (
    <main style={{ paddingTop: '64px' }}>
      <Servicios />
    </main>
  )
}
