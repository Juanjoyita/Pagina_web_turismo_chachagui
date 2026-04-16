'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  children: React.ReactNode
  direccion?: 'arriba' | 'izquierda' | 'derecha'
  delay?: number
}

export default function AnimarAlEntrar({
  children,
  direccion = 'arriba',
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  const transformInicial = {
    arriba:   'translateY(48px)',
    izquierda: 'translateX(-48px)',
    derecha:  'translateX(48px)',
  }[direccion]

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate(0)' : transformInicial,
        transition: `opacity 0.75s ease, transform 0.75s cubic-bezier(0.22, 0.61, 0.36, 1)`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}