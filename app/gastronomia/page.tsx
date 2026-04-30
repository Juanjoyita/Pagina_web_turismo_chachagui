import Gastronomia from '@/components/secciones/Gastronomia'

export const metadata = {
  title: 'Gastronomía — Chachagüí',
  description: 'Sabores nariñenses: empanadas de añejo, cuy y mucho más.',
}

export default function GastronomiaPage() {
  return (
    <main style={{ paddingTop: '64px' }}>
      <Gastronomia />
    </main>
  )
}
