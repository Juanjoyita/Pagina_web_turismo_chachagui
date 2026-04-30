import Aventura from '@/components/secciones/Aventura'

export const metadata = {
  title: 'Aventura — Chachagüí',
  description:
    'Parapente, ciclomontañismo, senderismo, recorridos a cascadas y avistamiento de aves en Chachagüí, Nariño.',
}

export default function AventuraPage() {
  return (
    <main style={{ paddingTop: '64px' }}>
      <Aventura />
    </main>
  )
}
