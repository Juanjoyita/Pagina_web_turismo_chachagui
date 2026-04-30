import { redirect } from 'next/navigation'

export default function HeladosPage() {
  // La heladería ahora es un plato típico más; mandamos a la lista completa
  redirect('/gastronomia/platos')
}
