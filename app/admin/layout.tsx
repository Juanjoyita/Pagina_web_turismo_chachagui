import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Panel Admin — Chachagüí Turismo',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}