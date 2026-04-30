import Festividades from '@/components/secciones/Festividades'

export const metadata = {
  title: 'Festividades — Chachagüí',
  description: 'Ferias, fiestas patronales y celebraciones de Chachagüí, Nariño.',
}

export default function FestividadesPage() {
  return (
    <main style={{ paddingTop: '64px' }}>
      <Festividades />
    </main>
  )
}
