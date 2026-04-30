import Proximamente from '@/components/Proximamente'

export const metadata = {
  title: 'Festival de Cometas — Chachagüí',
}

export default function CometasPage() {
  return (
    <Proximamente
      emoji="🪁"
      badge="Festividades · Cometas"
      titulo="Festival de Cometas"
      descripcion="Una de las celebraciones más coloridas del municipio. Pronto la información completa: fechas, ubicación y actividades."
      volverHref="/festividades"
      volverLabel="Volver a Festividades"
    />
  )
}
