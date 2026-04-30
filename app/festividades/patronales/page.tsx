import Proximamente from '@/components/Proximamente'

export const metadata = {
  title: 'Fiestas Patronales — Chachagüí',
}

export default function PatronalesPage() {
  return (
    <Proximamente
      emoji="⛪"
      badge="Festividades · Patronales"
      titulo="Fiestas Patronales"
      descripcion="Las fiestas patronales reúnen a la comunidad alrededor de la tradición religiosa y cultural del municipio. Pronto ampliamos esta información."
      volverHref="/festividades"
      volverLabel="Volver a Festividades"
    />
  )
}
