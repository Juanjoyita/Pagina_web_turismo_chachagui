import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-verde-oscuro)',
        color: '#FFFFFF',
        padding: '72px 0 28px',
        marginTop: '0',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr',
            gap: '48px',
            marginBottom: '48px',
          }}
          className="footer-grid"
        >
          {/* Columna 1: Logo + descripción */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '18px',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'var(--color-verde-claro)',
                  color: 'var(--color-verde-oscuro)',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontFamily: 'var(--font-titulo)',
                }}
              >
                C
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-titulo)',
                    fontSize: '20px',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    lineHeight: 1,
                  }}
                >
                  Chachagüí
                </div>
                <div
                  style={{
                    fontSize: '10px',
                    color: 'var(--color-verde-claro)',
                    letterSpacing: '2.5px',
                    textTransform: 'uppercase',
                    marginTop: '4px',
                    fontWeight: 700,
                  }}
                >
                  Turismo · Nariño
                </div>
              </div>
            </div>

            <p
              style={{
                color: 'rgba(255,255,255,0.55)',
                fontSize: '13px',
                lineHeight: 1.8,
                fontWeight: 300,
                maxWidth: '340px',
                margin: 0,
              }}
            >
              Un municipio del sur de Colombia con tradiciones ancestrales,
              paisajes de montaña, gastronomía única y la calidez de su gente.
            </p>
          </div>

          {/* Columna 2: Secciones */}
          <div>
            <h4
              style={{
                color: 'var(--color-verde-claro)',
                fontSize: '11px',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                fontWeight: 700,
                marginBottom: '20px',
              }}
            >
              Secciones
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {[
                { label: 'Arte y Cultura', href: '/#arte' },
                { label: 'Deporte y Aventura', href: '/#aventura' },
                { label: 'Naturaleza', href: '/#naturaleza' },
                { label: 'Gastronomía', href: '/#gastronomia' },
                { label: 'Festividades', href: '/#festividades' },
                { label: 'Servicios', href: '/#servicios' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{
                      color: 'rgba(255,255,255,0.6)',
                      fontSize: '13px',
                      textDecoration: 'none',
                      fontWeight: 400,
                      transition: 'color 0.2s',
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Más */}
          <div>
            <h4
              style={{
                color: 'var(--color-verde-claro)',
                fontSize: '11px',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                fontWeight: 700,
                marginBottom: '20px',
              }}
            >
              Más
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {[
                { label: 'Sobre Chachagüí', href: '/#arte' },
                { label: '¿Cómo llegar?', href: '/#servicios' },
                { label: 'Clima y altitud', href: '/#naturaleza' },
                { label: 'Mapa del sitio', href: '/' },
              ].map((item) => (
                <li key={item.href + item.label}>
                  <Link
                    href={item.href}
                    style={{
                      color: 'rgba(255,255,255,0.6)',
                      fontSize: '13px',
                      textDecoration: 'none',
                      fontWeight: 400,
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h4
              style={{
                color: 'var(--color-verde-claro)',
                fontSize: '11px',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                fontWeight: 700,
                marginBottom: '20px',
              }}
            >
              Contacto
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '13px',
                lineHeight: 1.6,
              }}
            >
              <li>
                <span
                  style={{
                    display: 'block',
                    color: 'rgba(255,255,255,0.35)',
                    fontSize: '10px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    marginBottom: '2px',
                  }}
                >
                  Alcaldía
                </span>
                Parque Principal · Chachagüí, Nariño
              </li>
              <li>
                <span
                  style={{
                    display: 'block',
                    color: 'rgba(255,255,255,0.35)',
                    fontSize: '10px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    marginBottom: '2px',
                  }}
                >
                  Teléfono
                </span>
                (+57) 602 000 0000
              </li>
              <li>
                <span
                  style={{
                    display: 'block',
                    color: 'rgba(255,255,255,0.35)',
                    fontSize: '10px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    marginBottom: '2px',
                  }}
                >
                  Correo
                </span>
                turismo@chachagui.gov.co
              </li>
            </ul>
          </div>
        </div>

        {/* Línea inferior */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div
            style={{
              color: 'rgba(255,255,255,0.35)',
              fontSize: '12px',
              fontWeight: 400,
            }}
          >
            © {new Date().getFullYear()} Chachagüí Turismo · Todos los derechos reservados
          </div>
          <div
            style={{
              color: 'rgba(255,255,255,0.35)',
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Hecho con 💚 en Nariño
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
