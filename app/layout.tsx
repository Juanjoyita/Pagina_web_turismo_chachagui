import type { Metadata } from 'next'
import { Playfair_Display, Raleway } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import InfoTuristicaBtn from '@/components/InfoTuristicaBtn'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Chachagüí – Turismo Nariño',
  description: 'Descubre la magia de Chachagüí: tradiciones ancestrales, paisajes de montaña, gastronomía única y la calidez de su gente en el corazón de Nariño.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
    <body
    className={`${playfair.variable} ${raleway.variable}`}
      style={{ fontFamily: 'var(--font-raleway), system-ui, sans-serif', background: 'var(--color-fondo)', margin: 0 }}
    >
        <Navbar />
        {children}
        <Footer />
        <InfoTuristicaBtn />
      </body>
    </html>
  )
}