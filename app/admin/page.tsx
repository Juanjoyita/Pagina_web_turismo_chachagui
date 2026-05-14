'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const CATALOGO: Record<string, { label: string; emoji: string; items: { id: string; nombre: string }[] }> = {
  naturaleza: {
    label: 'Naturaleza', emoji: '🏞️',
    items: [
      { id: 'NAT001', nombre: 'Reserva La Tebaida' },
      { id: 'NAT002', nombre: 'Reserva Rosa de los Andes' },
      { id: 'NAT003', nombre: 'Bosque El Común' },
      { id: 'NAT004', nombre: 'Matarredonda' },
      { id: 'NAT005', nombre: 'Cascada La Diamantina' },
      { id: 'NAT006', nombre: 'Cerro El Cundur' },
      { id: 'NAT007', nombre: 'Cascadas de Merlo' },
      { id: 'NAT009', nombre: 'Sendero La Pradera' },
      { id: 'NAT010', nombre: 'Sendero Leche y Miel' },
      { id: 'NAT011', nombre: 'Cascadas de Charmolán' },
      { id: 'NAT012', nombre: 'Fincas cafeteras' },
    ],
  },
  aventura: {
    label: 'Aventura', emoji: '🚵',
    items: [
      { id: 'AVEN001', nombre: 'Parapente' },
      { id: 'AVEN002', nombre: 'Ciclomontañismo' },
      { id: 'AVEN003', nombre: 'Senderismo' },
      { id: 'AVEN004', nombre: 'Recorridos a cascadas' },
      { id: 'AVEN005', nombre: 'Exploración de montaña' },
      { id: 'AVEN006', nombre: 'Avistamiento de aves' },
    ],
  },
  gastronomia: {
    label: 'Gastronomía', emoji: '🍽️',
    items: [
      { id: 'GAS001', nombre: 'Arepas de choclo' },
      { id: 'GAS002', nombre: 'La Boda' },
      { id: 'GAS003', nombre: 'Heladería' },
      { id: 'GAS004', nombre: 'Empanadas de añejo' },
      { id: 'GAS005', nombre: 'El Cuy' },
      { id: 'GAS007', nombre: 'Buñuelos de Harina' },
      { id: 'GAS008', nombre: 'Tacacho' },
    ],
  },
  'arte-cultura': {
    label: 'Arte y Cultura', emoji: '🎨',
    items: [
      { id: 'HIS001', nombre: 'Origen del nombre' },
      { id: 'HIS002', nombre: 'Aeropuerto Antonio Nariño' },
      { id: 'HIS003', nombre: 'Corredor Panamericano' },
      { id: 'HIS004', nombre: 'Casonas tradicionales' },
      { id: 'HIS006', nombre: 'Finca Loyola' },
      { id: 'HIS007', nombre: 'Puente Calicanto El Diablo' },
      { id: 'CUL001', nombre: 'Tejidos en fique' },
      { id: 'CUL002', nombre: 'Tradición campesina' },
      { id: 'ART001', nombre: 'Artesanías en fique' },
      { id: 'ART002', nombre: 'Figuras en madera' },
    ],
  },
  festividades: {
    label: 'Festividades', emoji: '🎉',
    items: [
      { id: 'FES001', nombre: 'Festival de Cometas' },
      { id: 'FES002', nombre: 'Virgen de Fátima' },
      { id: 'FES003', nombre: 'Carnaval Negros y Blancos' },
      { id: 'FES004', nombre: 'Semana Santa' },
    ],
  },
  prestadores: {
    label: 'Servicios', emoji: '🛎️',
    items: [
      { id: 'PRE001', nombre: 'Finca Leche y Miel' },
      { id: 'PRE002', nombre: 'Las Palmas Campestre' },
      { id: 'PRE003', nombre: 'Hotel Padua' },
      { id: 'PRE004', nombre: 'La Gran Estancia' },
      { id: 'PRE005', nombre: 'Charmolán' },
      { id: 'PRE006', nombre: 'Matarredonda' },
      { id: 'PRE007', nombre: 'Jardín Botánico Health Garden' },
    ],
  },
}

interface FotoInfo {
  indice: number
  urlBase: string
  urlActual: string
  overrideId: number | null
  tieneOverride: boolean
  visible: boolean
  nombreOrig: string | null
}

interface Override {
  id: number
  seccion: string
  item_id: string
  indice: number
  url: string
  visible: number
}

// ── Slot de foto individual ────────────────────────────────
function FotoSlot({
  foto,
  label,
  seccion,
  itemId,
  onUploaded,
  onReset,
  onToggleVisible,
}: {
  foto: FotoInfo
  label: string
  seccion: string
  itemId: string
  onUploaded: (indice: number, newUrl: string, overrideId: number) => void
  onReset: (indice: number) => void
  onToggleVisible: (indice: number, visible: boolean) => void
}) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [togglingVisible, setTogglingVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setImgError(false) }, [foto.urlActual])

  async function uploadFile(file: File) {
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    fd.append('seccion', seccion)
    fd.append('item_id', itemId)
    fd.append('indice', String(foto.indice))
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const data = await res.json()
    if (data.ok) {
      onUploaded(foto.indice, data.url, data.override.id)
    } else {
      alert('Error al subir: ' + (data.error ?? 'desconocido'))
    }
    setUploading(false)
  }

  async function toggleVisible() {
    if (!foto.overrideId) return
    setTogglingVisible(true)
    const newVisible = !foto.visible
    const res = await fetch(`/api/admin/imagenes/${foto.overrideId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visible: newVisible }),
    })
    if (res.ok) {
      onToggleVisible(foto.indice, newVisible)
    } else {
      alert('Error al cambiar visibilidad')
    }
    setTogglingVisible(false)
  }

  const tieneImagen = !imgError && !!foto.urlActual
  const estaOculta = foto.tieneOverride && !foto.visible

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

      {/* Cabecera */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', flexWrap: 'wrap' }}>
        <span style={{
          fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: foto.tieneOverride
            ? (estaOculta ? 'rgba(var(--color-verde-oscuro-rgb), 0.35)' : 'var(--color-verde-oscuro)')
            : 'rgba(var(--color-verde-oscuro-rgb), 0.45)',
        }}>
          {label}
        </span>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {foto.tieneOverride && (
            <span style={{
              background: estaOculta
                ? 'rgba(229,62,62,0.1)'
                : 'rgba(var(--color-verde-claro-rgb), 0.18)',
              color: estaOculta ? '#e53e3e' : 'var(--color-verde-oscuro)',
              fontSize: '9px', fontWeight: 700, letterSpacing: '1px',
              textTransform: 'uppercase', padding: '2px 8px', borderRadius: '10px',
            }}>
              {estaOculta ? '● oculta' : '✓ personalizada'}
            </span>
          )}
        </div>
      </div>

      {/* Zona de imagen + drop */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => {
          e.preventDefault(); setDragOver(false)
          const f = e.dataTransfer.files[0]
          if (f) uploadFile(f)
        }}
        onClick={() => !uploading && inputRef.current?.click()}
        style={{
          position: 'relative',
          aspectRatio: foto.indice === 0 ? '16/9' : '4/3',
          borderRadius: '12px',
          overflow: 'hidden',
          border: `2px solid ${
            dragOver
              ? 'var(--color-verde-claro)'
              : estaOculta
              ? '#e53e3e44'
              : foto.tieneOverride
              ? 'var(--color-verde-claro)'
              : 'var(--color-borde)'
          }`,
          cursor: uploading ? 'wait' : 'pointer',
          transition: 'border-color 0.2s',
          background: '#f5f5f5',
        }}
      >
        {/* Foto actual */}
        {tieneImagen && (
          <img
            src={foto.urlActual}
            alt={label}
            onError={() => setImgError(true)}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', display: 'block',
              opacity: estaOculta ? 0.35 : 1,
              filter: estaOculta ? 'grayscale(60%)' : 'none',
              transition: 'opacity 0.3s, filter 0.3s',
            }}
          />
        )}

        {/* Indicador de oculta encima de la imagen */}
        {estaOculta && tieneImagen && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
          }}>
            <div style={{
              background: 'rgba(229,62,62,0.85)',
              color: '#fff', fontSize: '11px', fontWeight: 700,
              padding: '6px 14px', borderRadius: '20px',
              letterSpacing: '1px', textTransform: 'uppercase',
            }}>
              🚫 No visible en el sitio
            </div>
          </div>
        )}

        {/* Placeholder sin imagen */}
        {!tieneImagen && !uploading && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '6px',
          }}>
            <div style={{ fontSize: '28px', opacity: 0.3 }}>📷</div>
            <div style={{
              fontSize: '11px',
              color: 'rgba(var(--color-verde-oscuro-rgb), 0.35)',
              lineHeight: 1.4, textAlign: 'center', padding: '0 12px',
            }}>
              Sin imagen<br/>Arrastra o haz clic
            </div>
          </div>
        )}

        {/* Overlay hover */}
        {tieneImagen && !uploading && (
          <div className="foto-overlay" style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.25s',
          }}>
            <div className="foto-overlay-label" style={{
              background: 'var(--color-verde-claro)',
              color: 'var(--color-verde-oscuro)',
              fontSize: '12px', fontWeight: 700,
              padding: '7px 14px', borderRadius: '20px',
              opacity: 0,
              transform: 'translateY(6px)',
              transition: 'opacity 0.2s, transform 0.2s',
              display: 'flex', alignItems: 'center', gap: '6px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
            }}>
              🔄 Cambiar foto
            </div>
          </div>
        )}

        {/* Overlay drag */}
        {dragOver && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(var(--color-verde-claro-rgb), 0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '13px', fontWeight: 700, color: 'var(--color-verde-oscuro)',
          }}>
            ⬇ Suelta aquí
          </div>
        )}

        {/* Overlay subiendo */}
        {uploading && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(255,255,255,0.85)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              border: '3px solid var(--color-verde-claro)',
              borderTopColor: 'transparent',
              animation: 'spin 0.7s linear infinite',
            }} />
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-verde-oscuro)' }}>
              Subiendo…
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          style={{ display: 'none' }}
          onChange={e => { const f = e.target.files?.[0]; if (f) uploadFile(f); e.target.value = '' }}
        />
      </div>

      {/* Nombre original */}
      {foto.tieneOverride && foto.nombreOrig && (
        <div style={{
          fontSize: '11px', color: 'rgba(var(--color-verde-oscuro-rgb), 0.4)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          📁 {foto.nombreOrig}
        </div>
      )}

      {/* Acciones cuando hay override */}
      {foto.tieneOverride && (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>

          {/* Toggle visible / ocultar */}
          <button
            onClick={toggleVisible}
            disabled={togglingVisible}
            style={{
              padding: '5px 12px',
              border: `1px solid ${estaOculta ? '#38a169' : '#e53e3e'}`,
              borderRadius: '8px',
              background: estaOculta ? 'rgba(56,161,105,0.06)' : 'rgba(229,62,62,0.06)',
              color: estaOculta ? '#38a169' : '#e53e3e',
              fontSize: '11px', cursor: togglingVisible ? 'wait' : 'pointer',
              transition: 'all 0.15s',
              fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: '4px',
            }}
          >
            {togglingVisible
              ? '…'
              : estaOculta
              ? '👁 Mostrar en sitio'
              : '🚫 Ocultar del sitio'
            }
          </button>

          {/* Restaurar original */}
          <button
            onClick={() => onReset(foto.indice)}
            style={{
              padding: '5px 12px',
              border: '1px solid var(--color-borde)',
              borderRadius: '8px',
              background: 'transparent',
              color: 'rgba(var(--color-verde-oscuro-rgb), 0.5)',
              fontSize: '11px', cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#e53e3e'
              e.currentTarget.style.color = '#e53e3e'
              e.currentTarget.style.background = 'rgba(229,62,62,0.06)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--color-borde)'
              e.currentTarget.style.color = 'rgba(var(--color-verde-oscuro-rgb), 0.5)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            ↩ Restaurar original
          </button>
        </div>
      )}
    </div>
  )
}

// ── Panel principal ────────────────────────────────────────
export default function AdminPage() {
  const router = useRouter()
  const [seccionActiva, setSeccionActiva] = useState('naturaleza')
  const [itemActivo, setItemActivo] = useState<string | null>(null)
  const [overridesSeccion, setOverridesSeccion] = useState<Override[]>([])
  const [fotosItem, setFotosItem] = useState<FotoInfo[] | null>(null)
  const [cargandoFotos, setCargandoFotos] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    setItemActivo(null)
    fetch(`/api/admin/imagenes?seccion=${seccionActiva}`)
      .then(r => r.json())
      .then(d => setOverridesSeccion(d.overrides ?? []))
      .catch(() => {})
  }, [seccionActiva])

  useEffect(() => {
    if (!itemActivo) { setFotosItem(null); return }
    setCargandoFotos(true)
    fetch(`/api/admin/resolver?seccion=${seccionActiva}&item_id=${itemActivo}`)
      .then(r => r.json())
      .then(d => setFotosItem(d.fotos ?? null))
      .catch(() => setFotosItem(null))
      .finally(() => setCargandoFotos(false))
  }, [itemActivo, seccionActiva])

  function handleUploaded(indice: number, newUrl: string, overrideId: number) {
    setFotosItem(prev => prev
      ? prev.map(f => f.indice === indice
          ? { ...f, urlActual: newUrl, tieneOverride: true, overrideId, visible: true, nombreOrig: null }
          : f)
      : prev
    )
    setOverridesSeccion(prev => {
      const filtered = prev.filter(o => !(o.item_id === itemActivo && o.indice === indice))
      return [...filtered, { id: overrideId, seccion: seccionActiva, item_id: itemActivo!, indice, url: newUrl, visible: 1 }]
    })
  }

  async function handleReset(indice: number) {
    const foto = fotosItem?.find(f => f.indice === indice)
    if (!foto?.overrideId) return
    if (!confirm('¿Restaurar la imagen original?')) return

    const res = await fetch(`/api/admin/imagenes/${foto.overrideId}`, { method: 'DELETE' })
    if (!res.ok) return

    setFotosItem(prev => prev
      ? prev.map(f => f.indice === indice
          ? { ...f, urlActual: f.urlBase, tieneOverride: false, overrideId: null, visible: true, nombreOrig: null }
          : f)
      : prev
    )
    setOverridesSeccion(prev => prev.filter(o => !(o.item_id === itemActivo && o.indice === indice)))
  }

  function handleToggleVisible(indice: number, visible: boolean) {
    setFotosItem(prev => prev
      ? prev.map(f => f.indice === indice ? { ...f, visible } : f)
      : prev
    )
    setOverridesSeccion(prev =>
      prev.map(o => (o.item_id === itemActivo && o.indice === indice)
        ? { ...o, visible: visible ? 1 : 0 }
        : o
      )
    )
  }

  async function logout() {
    setLoggingOut(true)
    await fetch('/api/admin/login', { method: 'DELETE' })
    router.push('/admin/login')
  }

  const items = CATALOGO[seccionActiva]?.items ?? []
  const itemNombre = items.find(i => i.id === itemActivo)?.nombre ?? ''
  const fotosPersonalizadas = overridesSeccion.filter(o => o.seccion === seccionActiva).length
  const fotasOcultas = overridesSeccion.filter(o => o.seccion === seccionActiva && o.visible === 0).length

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-fondo)' }}>

      {/* HEADER */}
      <header style={{
        background: 'var(--color-verde-oscuro)',
        borderBottom: '1px solid rgba(var(--color-verde-claro-rgb), 0.2)',
        padding: '0 28px', height: '58px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '9px',
            background: 'var(--color-verde-claro)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px',
          }}>🌿</div>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '14px', lineHeight: 1.2 }}>
              Panel Admin
            </div>
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '10px' }}>
              Chachagüí Turismo · Gestión de imágenes
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <a href="/" target="_blank" style={{
            color: 'rgba(255,255,255,0.55)', fontSize: '12px', fontWeight: 600,
            textDecoration: 'none', padding: '5px 12px',
            border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px',
          }}>
            🌐 Ver sitio
          </a>
          <button onClick={logout} disabled={loggingOut} style={{
            color: 'rgba(255,255,255,0.45)', fontSize: '12px',
            background: 'none', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '8px', padding: '5px 12px', cursor: 'pointer',
          }}>
            {loggingOut ? '…' : 'Salir'}
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 58px)' }}>

        {/* SIDEBAR */}
        <aside style={{
          width: '220px', flexShrink: 0,
          background: '#fff',
          borderRight: '1.5px solid var(--color-borde)',
          padding: '16px 0',
          position: 'sticky', top: '58px',
          height: 'calc(100vh - 58px)',
          overflowY: 'auto',
        }}>
          <div style={{
            padding: '0 16px 10px',
            fontSize: '9px', fontWeight: 700, letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'rgba(var(--color-verde-oscuro-rgb), 0.35)',
          }}>
            Secciones
          </div>

          {Object.entries(CATALOGO).map(([key, cat]) => {
            const overridesDeEsta = overridesSeccion.filter(o => o.seccion === key)
            const cnt = overridesDeEsta.length
            const ocultas = overridesDeEsta.filter(o => o.visible === 0).length
            const activo = seccionActiva === key
            return (
              <button
                key={key}
                onClick={() => { setSeccionActiva(key); setItemActivo(null) }}
                style={{
                  width: '100%', textAlign: 'left',
                  padding: '9px 16px',
                  background: activo ? 'rgba(var(--color-verde-claro-rgb), 0.1)' : 'transparent',
                  border: 'none',
                  borderLeft: activo ? '3px solid var(--color-verde-claro)' : '3px solid transparent',
                  color: activo ? 'var(--color-verde-oscuro)' : 'rgba(var(--color-verde-oscuro-rgb), 0.6)',
                  fontSize: '13px', fontWeight: activo ? 700 : 400,
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: '8px',
                }}
              >
                <span>{cat.emoji} {cat.label}</span>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {ocultas > 0 && (
                    <span style={{
                      background: 'rgba(229,62,62,0.12)', color: '#e53e3e',
                      fontSize: '9px', fontWeight: 700,
                      padding: '2px 5px', borderRadius: '8px',
                    }}>{ocultas}</span>
                  )}
                  {cnt > 0 && (
                    <span style={{
                      background: 'var(--color-verde-claro)',
                      color: 'var(--color-verde-oscuro)',
                      fontSize: '9px', fontWeight: 700,
                      padding: '2px 6px', borderRadius: '8px',
                    }}>{cnt}</span>
                  )}
                </div>
              </button>
            )
          })}

          <div style={{
            margin: '16px', padding: '12px',
            background: 'rgba(var(--color-verde-claro-rgb), 0.07)',
            borderRadius: '10px',
            border: '1px solid rgba(var(--color-verde-claro-rgb), 0.18)',
          }}>
            <div style={{ fontSize: '11px', color: 'var(--color-verde-oscuro)', fontWeight: 700, marginBottom: '4px' }}>
              💡 Acciones
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(var(--color-verde-oscuro-rgb), 0.55)', lineHeight: 1.5 }}>
              Sube fotos arrastrando o haciendo clic. Usa <strong>Ocultar</strong> para quitar del sitio sin borrar.
            </div>
          </div>
        </aside>

        {/* ÁREA PRINCIPAL */}
        <main style={{ flex: 1, padding: '28px 32px', overflowY: 'auto', minWidth: 0 }}>

          {/* LISTADO DE ITEMS */}
          {!itemActivo && (
            <>
              <div style={{ marginBottom: '24px' }}>
                <h1 style={{
                  fontFamily: 'var(--font-titulo)',
                  fontSize: '24px', fontWeight: 800,
                  color: 'var(--color-verde-oscuro)', margin: '0 0 4px',
                }}>
                  {CATALOGO[seccionActiva]?.emoji} {CATALOGO[seccionActiva]?.label}
                </h1>
                <p style={{ fontSize: '13px', color: 'rgba(var(--color-verde-oscuro-rgb), 0.5)', margin: 0 }}>
                  Haz clic en un elemento para ver y editar sus fotos.
                  {fotosPersonalizadas > 0 && (
                    <span style={{ marginLeft: '6px', color: 'var(--color-verde-oscuro)', fontWeight: 600 }}>
                      · {fotosPersonalizadas} personalizada{fotosPersonalizadas > 1 ? 's' : ''}
                    </span>
                  )}
                  {fotasOcultas > 0 && (
                    <span style={{ marginLeft: '6px', color: '#e53e3e', fontWeight: 600 }}>
                      · {fotasOcultas} oculta{fotasOcultas > 1 ? 's' : ''}
                    </span>
                  )}
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '14px',
              }}>
                {items.map(item => {
                  const overridesItem = overridesSeccion.filter(o => o.item_id === item.id)
                  const cnt = overridesItem.length
                  const ocultas = overridesItem.filter(o => o.visible === 0).length
                  return (
                    <button
                      key={item.id}
                      onClick={() => setItemActivo(item.id)}
                      style={{
                        textAlign: 'left', padding: '18px',
                        background: '#fff', borderRadius: '14px',
                        border: `1.5px solid ${cnt > 0 ? 'var(--color-verde-claro)' : 'var(--color-borde)'}`,
                        borderLeft: `5px solid ${ocultas > 0 ? '#e53e3e' : cnt > 0 ? 'var(--color-verde-claro)' : 'var(--color-borde)'}`,
                        cursor: 'pointer', transition: 'all 0.2s',
                        boxShadow: '0 1px 6px rgba(var(--color-verde-oscuro-rgb), 0.05)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-3px)'
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(var(--color-verde-oscuro-rgb), 0.10)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = '0 1px 6px rgba(var(--color-verde-oscuro-rgb), 0.05)'
                      }}
                    >
                      <div style={{
                        fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        color: 'rgba(var(--color-verde-oscuro-rgb), 0.3)', marginBottom: '4px',
                      }}>
                        {item.id}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-titulo)',
                        fontSize: '14px', fontWeight: 700,
                        color: 'var(--color-verde-oscuro)',
                        lineHeight: 1.3, marginBottom: '10px',
                      }}>
                        {item.nombre}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          {cnt > 0 ? (
                            <span style={{
                              fontSize: '11px', fontWeight: 600,
                              color: 'var(--color-verde-oscuro)',
                            }}>
                              {cnt} foto{cnt > 1 ? 's' : ''}
                            </span>
                          ) : (
                            <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(var(--color-verde-oscuro-rgb), 0.35)' }}>
                              originales
                            </span>
                          )}
                          {ocultas > 0 && (
                            <span style={{
                              background: 'rgba(229,62,62,0.1)', color: '#e53e3e',
                              fontSize: '10px', fontWeight: 700,
                              padding: '1px 6px', borderRadius: '8px',
                            }}>
                              {ocultas} oculta{ocultas > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                        <span style={{ fontSize: '13px', color: 'rgba(var(--color-verde-oscuro-rgb), 0.4)' }}>→</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </>
          )}

          {/* EDITOR DE FOTOS */}
          {itemActivo && (
            <>
              {/* Breadcrumb */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setItemActivo(null)}
                  style={{
                    background: '#fff', border: '1.5px solid var(--color-borde)',
                    borderRadius: '9px', padding: '7px 14px',
                    color: 'rgba(var(--color-verde-oscuro-rgb), 0.65)',
                    fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '5px',
                  }}
                >
                  ← Volver
                </button>
                <div style={{ height: '20px', width: '1px', background: 'var(--color-borde)' }} />
                <div>
                  <span style={{
                    fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: 'rgba(var(--color-verde-oscuro-rgb), 0.35)',
                  }}>
                    {CATALOGO[seccionActiva]?.emoji} {CATALOGO[seccionActiva]?.label} · {itemActivo}
                  </span>
                  <h2 style={{
                    fontFamily: 'var(--font-titulo)',
                    fontSize: '20px', fontWeight: 800,
                    color: 'var(--color-verde-oscuro)', margin: '2px 0 0',
                  }}>
                    {itemNombre}
                  </h2>
                </div>
              </div>

              {/* Cargando */}
              {cargandoFotos && (
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '80px 0', gap: '12px',
                  color: 'rgba(var(--color-verde-oscuro-rgb), 0.4)', fontSize: '14px',
                }}>
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    border: '2px solid var(--color-verde-claro)',
                    borderTopColor: 'transparent',
                    animation: 'spin 0.7s linear infinite',
                  }} />
                  Cargando fotos…
                </div>
              )}

              {/* Fotos cargadas */}
              {!cargandoFotos && fotosItem && (
                <>
                  {/* PORTADA */}
                  <div style={{ marginBottom: '32px' }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      marginBottom: '16px', paddingBottom: '10px',
                      borderBottom: '2px solid var(--color-verde-claro)',
                    }}>
                      <h3 style={{
                        fontFamily: 'var(--font-titulo)',
                        fontSize: '15px', fontWeight: 700,
                        color: 'var(--color-verde-oscuro)', margin: 0,
                      }}>
                        Foto de portada
                      </h3>
                      <span style={{ fontSize: '11px', color: 'rgba(var(--color-verde-oscuro-rgb), 0.45)', fontWeight: 400 }}>
                        Aparece en tarjetas y encabezados del sitio
                      </span>
                    </div>
                    <div style={{ maxWidth: '520px' }}>
                      <FotoSlot
                        foto={fotosItem[0]}
                        label="Portada"
                        seccion={seccionActiva}
                        itemId={itemActivo}
                        onUploaded={handleUploaded}
                        onReset={handleReset}
                        onToggleVisible={handleToggleVisible}
                      />
                    </div>
                  </div>

                  {/* GALERÍA */}
                  {fotosItem.length > 1 && (
                    <div>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        marginBottom: '16px', paddingBottom: '10px',
                        borderBottom: '2px solid rgba(var(--color-verde-claro-rgb), 0.35)',
                      }}>
                        <h3 style={{
                          fontFamily: 'var(--font-titulo)',
                          fontSize: '15px', fontWeight: 700,
                          color: 'var(--color-verde-oscuro)', margin: 0,
                        }}>
                          Galería
                        </h3>
                        <span style={{ fontSize: '11px', color: 'rgba(var(--color-verde-oscuro-rgb), 0.45)', fontWeight: 400 }}>
                          Aparecen en la página de detalle con lightbox
                        </span>
                      </div>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '20px',
                      }}>
                        {fotosItem.slice(1).map(foto => (
                          <FotoSlot
                            key={foto.indice}
                            foto={foto}
                            label={`Galería ${foto.indice}`}
                            seccion={seccionActiva}
                            itemId={itemActivo}
                            onUploaded={handleUploaded}
                            onReset={handleReset}
                            onToggleVisible={handleToggleVisible}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Nota */}
                  <div style={{
                    marginTop: '28px', padding: '14px 18px',
                    background: 'rgba(var(--color-verde-claro-rgb), 0.08)',
                    borderRadius: '12px',
                    border: '1px solid rgba(var(--color-verde-claro-rgb), 0.2)',
                    fontSize: '12px',
                    color: 'rgba(var(--color-verde-oscuro-rgb), 0.6)',
                    lineHeight: 1.6,
                  }}>
                    <strong style={{ color: 'var(--color-verde-oscuro)' }}>💡 Formatos:</strong>{' '}
                    JPG, PNG, WebP, AVIF.{' '}
                    <strong style={{ color: 'var(--color-verde-oscuro)' }}>Ocultar</strong>{' '}
                    quita la imagen del sitio sin borrarla — puedes volver a mostrarla en cualquier momento.{' '}
                    <strong style={{ color: 'var(--color-verde-oscuro)' }}>Restaurar original</strong>{' '}
                    elimina el registro y vuelve a la imagen base.
                  </div>
                </>
              )}
            </>
          )}
        </main>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        div:hover > .foto-overlay { background: rgba(0,0,0,0.38) !important; }
        div:hover > .foto-overlay > .foto-overlay-label { opacity: 1 !important; transform: translateY(0) !important; }
      `}</style>
    </div>
  )
}