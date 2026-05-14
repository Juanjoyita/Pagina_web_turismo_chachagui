'use client'

import Link from 'next/link'
import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'

const links = [
  {
    href: '/#arte',
    label: 'Arte y Cultura',
    emoji: '🎨',
    sub: [
      { href: '/arte/historia',    label: 'Historia' },
      { href: '/arte/cultura',     label: 'Cultura' },
      { href: '/arte/artesanias',  label: 'Artesanías' },
      { href: '/arte/tradiciones', label: 'Tradiciones' },
    ],
  },
  {
    href: '/#aventura',
    label: 'Aventura',
    emoji: '🚵',
    sub: [
      { href: '/aventura/parapente',           label: 'Parapente' },
      { href: '/aventura/ciclomontanismo',      label: 'Ciclomontañismo' },
      { href: '/aventura/senderismo',          label: 'Senderismo' },
      { href: '/aventura/cascadas',            label: 'Recorridos a cascadas' },
      { href: '/aventura/exploracion-montana', label: 'Exploración de montaña' },
      { href: '/aventura/avistamiento-aves',   label: 'Avistamiento de aves' },
    ],
  },
  {
    href: '/#naturaleza',
    label: 'Naturaleza',
    emoji: '🏞️',
    sub: [
      { href: '/naturaleza?categoria=Reserva',    label: 'Reservas naturales' },
      { href: '/naturaleza?categoria=Cascada',    label: 'Cascadas' },
      { href: '/naturaleza?categoria=Sendero',    label: 'Senderos' },
      { href: '/naturaleza?categoria=Mirador',    label: 'Miradores' },
      { href: '/naturaleza?categoria=Finca',      label: 'Fincas cafeteras' },
    ],
  },
  {
    href: '/#gastronomia',
    label: 'Gastronomía',
    emoji: '🍲',
    sub: [
      { href: '/gastronomia/arepas-de-choclo',  label: 'Arepas de choclo' },
      { href: '/gastronomia/la-boda',           label: 'La Boda' },
      { href: '/gastronomia/empanadas-de-anejo', label: 'Empanadas de añejo' },
      { href: '/gastronomia/el-cuy',            label: 'El Cuy' },
      { href: '/gastronomia/platos',            label: 'Ver todos los platos típicos →' },
    ],
  },
  {
    href: '/#festividades',
    label: 'Festividades',
    emoji: '🎉',
    sub: [
      { href: '/festividades/festival-de-cometas',   label: 'Festival de Cometas · Agosto' },
      { href: '/festividades/fiestas-virgen-de-fatima', label: 'Virgen de Fátima · Mayo' },
      { href: '/festividades/carnaval-de-blancos-y-negros', label: 'Carnaval de Negros y Blancos · Enero' },
      { href: '/festividades/semana-santa', label: 'Semana Santa · Marzo/Abril' },
    ],
  },
  {
    href: '/#servicios',
    label: 'Servicios',
    emoji: '🛎️',
    sub: [
      { href: '/servicios/hotel-padua',               label: 'Hotel Padua' },
      { href: '/servicios/finca-leche-y-miel',          label: 'Finca Leche y Miel' },
      { href: '/servicios/las-palmas-campestre',         label: 'Las Palmas Campestre' },
      { href: '/servicios/la-gran-estancia',             label: 'La Gran Estancia' },
      { href: '/servicios/charmolan',                    label: 'Charmolán' },
      { href: '/servicios/matarredonda',                 label: 'Matarredonda' },
      { href: '/servicios/jardin-botanico-health-garden',label: 'Jardín Botánico Health Garden' },
    ],
  },
]

function NavItem({ link }: { link: typeof links[0] }) {
  const [abierto, setAbierto]   = useState(false)
  const [rect, setRect]         = useState<DOMRect | null>(null)
  const liRef                   = useRef<HTMLLIElement>(null)
  const timeoutRef              = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [mounted, setMounted]   = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const abrir = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (liRef.current) setRect(liRef.current.getBoundingClientRect())
    setAbierto(true)
  }, [])

  const cerrar = useCallback(() => {
    timeoutRef.current = setTimeout(() => setAbierto(false), 80)
  }, [])

  const mantener = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }, [])

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [])

  const menuWidth = 220
  const left = rect ? Math.min(rect.left, window.innerWidth - menuWidth - 12) : 0
  const top  = rect ? rect.bottom + 6 : 0

  return (
    <>
      <li
        ref={liRef}
        onMouseEnter={abrir}
        onMouseLeave={cerrar}
        style={{ listStyle: 'none' }}
      >
        <Link
          href={link.href}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            color: abierto ? 'var(--color-verde-claro)' : '#FFFFFF',
            background: abierto ? 'rgba(var(--color-verde-claro-rgb), 0.13)' : 'transparent',
            textDecoration: 'none',
            fontSize: '11.5px', fontWeight: 600,
            padding: '8px 12px', borderRadius: '8px',
            transition: 'color 0.2s, background 0.2s',
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}
        >
          <span aria-hidden="true" style={{ fontSize: '14px' }}>{link.emoji}</span>
          {link.label}
        </Link>
      </li>

      {mounted && abierto && createPortal(
        <div
          onMouseEnter={mantener}
          onMouseLeave={cerrar}
          style={{
            position: 'fixed',
            top: `${top}px`,
            left: `${left}px`,
            width: `${menuWidth}px`,
            zIndex: 99999,
          }}
        >
          <ul style={{
            listStyle: 'none', margin: 0, padding: '8px',
            background: 'var(--color-verde-oscuro)',
            border: '1px solid rgba(var(--color-verde-claro-rgb), 0.25)',
            borderRadius: '14px',
            boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
          }}>
            {link.sub.map((sub, i) => (
              <li key={`${sub.href}-${i}`}>
                <Link
                  href={sub.href}
                  onClick={() => setAbierto(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    color: 'rgba(255,255,255,0.75)',
                    textDecoration: 'none',
                    fontSize: '13px', fontWeight: 500,
                    padding: '10px 12px', borderRadius: '9px',
                    transition: 'color 0.15s, background 0.15s, padding-left 0.15s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = 'var(--color-verde-claro)'
                    el.style.background = 'rgba(var(--color-verde-claro-rgb), 0.1)'
                    el.style.paddingLeft = '18px'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = 'rgba(255,255,255,0.75)'
                    el.style.background = 'transparent'
                    el.style.paddingLeft = '12px'
                  }}
                >
                  <span aria-hidden="true" style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: 'var(--color-verde-claro)', flexShrink: 0,
                    boxShadow: '0 0 6px rgba(var(--color-verde-claro-rgb), 0.4)',
                  }} />
                  {sub.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>,
        document.body
      )}
    </>
  )
}

export default function Navbar() {
  const [menuAbierto,    setMenuAbierto]    = useState(false)
  const [submenuAbierto, setSubmenuAbierto] = useState<string | null>(null)
  const [isMobile,       setIsMobile]       = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <nav
      aria-label="Navegación principal"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: '64px',
        background: 'rgba(var(--color-verde-oscuro-rgb), 0.97)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(var(--color-verde-claro-rgb), 0.18)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 36px',
      }}
    >
      {/* ── LOGO ── */}
      <Link
        href="/"
        aria-label="Inicio — Alcaldía Municipal de Chachagüí"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          display: 'flex', alignItems: 'center',
          textDecoration: 'none', flexShrink: 0,
        }}
      >
        <div style={{
          background: '#FFFFFF',
          borderRadius: '10px',
          padding: '5px 12px',
          display: 'flex', alignItems: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
          height: '46px',
        }}>
          <img
            src="/imagenes/logo-alcaldia.png"
            alt="Alcaldía Municipal de Chachagüí"
            style={{
              height: '36px',
              width: 'auto',
              display: 'block',
              objectFit: 'contain',
            }}
          />
        </div>
      </Link>

      {/* ── LINKS ESCRITORIO ── */}
      {!isMobile && (
        <ul
          role="menubar"
          style={{
            display: 'flex', alignItems: 'center',
            gap: '2px', listStyle: 'none', margin: 0, padding: 0,
          }}
        >
          {links.map((link) => (
            <NavItem key={link.href} link={link} />
          ))}
        </ul>
      )}

      {/* ── HAMBURGUESA ── */}
      {isMobile && (
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuAbierto}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '6px', display: 'flex', flexDirection: 'column', gap: '5px',
          }}
        >
          <span style={{
            display: 'block', width: '24px', height: '2.5px',
            background: '#FFFFFF', borderRadius: '2px', transition: 'all 0.3s',
            transform: menuAbierto ? 'translateY(7.5px) rotate(45deg)' : 'none',
          }} />
          <span style={{
            display: 'block', width: '24px', height: '2.5px',
            background: '#FFFFFF', borderRadius: '2px', transition: 'all 0.3s',
            opacity: menuAbierto ? 0 : 1,
          }} />
          <span style={{
            display: 'block', width: '24px', height: '2.5px',
            background: '#FFFFFF', borderRadius: '2px', transition: 'all 0.3s',
            transform: menuAbierto ? 'translateY(-7.5px) rotate(-45deg)' : 'none',
          }} />
        </button>
      )}

      {/* ── MENÚ MÓVIL ── */}
      {isMobile && menuAbierto && (
        <nav
          id="mobile-menu"
          aria-label="Menú móvil"
          style={{
            position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 999,
            background: 'var(--color-verde-oscuro)',
            borderBottom: '2px solid rgba(var(--color-verde-claro-rgb), 0.3)',
            maxHeight: 'calc(100vh - 64px)',
            overflowY: 'auto',
            padding: '8px 0 32px',
          }}
        >
          {links.map((link) => (
            <section key={link.href}>
              <button
                aria-expanded={submenuAbierto === link.href}
                onClick={() => setSubmenuAbierto(
                  submenuAbierto === link.href ? null : link.href
                )}
                style={{
                  width: '100%', background: 'none', border: 'none',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between',
                  color: '#FFFFFF', fontSize: '15px', fontWeight: 600,
                  padding: '15px 28px', cursor: 'pointer',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span aria-hidden="true" style={{ fontSize: '20px' }}>{link.emoji}</span>
                  {link.label}
                </span>
                <span aria-hidden="true" style={{
                  fontSize: '10px', opacity: 0.4,
                  display: 'inline-block',
                  transform: submenuAbierto === link.href ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.25s',
                }}>▼</span>
              </button>

              {submenuAbierto === link.href && (
                <ul style={{
                  listStyle: 'none', margin: 0, padding: 0,
                  background: 'rgba(0,0,0,0.25)',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}>
                  {link.sub.map((sub, i) => (
                    <li key={`${sub.href}-${i}`}>
                      <Link
                        href={sub.href}
                        onClick={() => {
                          setMenuAbierto(false)
                          setSubmenuAbierto(null)
                        }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '12px',
                          color: 'rgba(255,255,255,0.65)',
                          textDecoration: 'none',
                          fontSize: '13.5px', fontWeight: 500,
                          padding: '13px 28px 13px 52px',
                          borderBottom: '1px solid rgba(255,255,255,0.04)',
                        }}
                      >
                        <span aria-hidden="true" style={{
                          width: '5px', height: '5px', borderRadius: '50%',
                          background: 'var(--color-verde-claro)', flexShrink: 0,
                        }} />
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </nav>
      )}
    </nav>
  )
}