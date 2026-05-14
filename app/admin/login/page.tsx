'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push('/admin')
      } else {
        let msg = 'Error al iniciar sesión'
        try {
          const data = await res.json()
          msg = data.error ?? msg
        } catch {
          if (res.status === 500) {
            msg = 'Error del servidor (better-sqlite3). Ejecuta "npm rebuild better-sqlite3" y reinicia el servidor.'
          }
        }
        setError(msg)
      }
    } catch {
      setError('No se pudo conectar con el servidor')
    }

    setLoading(false)
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--color-verde-oscuro)',
      backgroundImage: 'radial-gradient(circle, rgba(var(--color-verde-claro-rgb), 0.10) 1.5px, transparent 1.5px)',
      backgroundSize: '28px 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px', height: '64px',
            borderRadius: '18px',
            background: 'var(--color-verde-claro)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '32px', margin: '0 auto 16px',
            boxShadow: '0 8px 24px rgba(var(--color-verde-claro-rgb), 0.4)',
          }}>🌿</div>
          <h1 style={{
            fontFamily: 'var(--font-titulo)',
            fontSize: '24px', fontWeight: 800,
            color: 'var(--color-verde-oscuro)',
            margin: '0 0 6px',
          }}>Panel Admin</h1>
          <p style={{ fontSize: '13px', color: 'rgba(var(--color-verde-oscuro-rgb), 0.5)', margin: 0 }}>
            Chachagüí Turismo
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={{
            display: 'block',
            fontSize: '12px', fontWeight: 700,
            letterSpacing: '1.5px', textTransform: 'uppercase',
            color: 'var(--color-verde-oscuro)',
            marginBottom: '8px',
          }}>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••••"
            autoFocus
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '12px 16px',
              border: `2px solid ${error ? '#e53e3e' : 'var(--color-borde)'}`,
              borderRadius: '12px',
              fontSize: '16px',
              color: 'var(--color-verde-oscuro)',
              outline: 'none',
              fontFamily: 'inherit',
              transition: 'border-color 0.2s',
              marginBottom: '8px',
            }}
          />
          {error && (
            <p style={{ fontSize: '13px', color: '#e53e3e', margin: '0 0 16px', lineHeight: 1.5 }}>
              ⚠️ {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: '100%',
              padding: '13px',
              background: loading || !password
                ? 'rgba(var(--color-verde-oscuro-rgb), 0.3)'
                : 'var(--color-verde-oscuro)',
              color: loading || !password ? 'rgba(255,255,255,0.5)' : 'var(--color-verde-claro)',
              border: 'none', borderRadius: '12px',
              fontSize: '14px', fontWeight: 700,
              cursor: loading || !password ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              marginTop: '8px',
            }}
          >
            {loading ? 'Entrando…' : 'Entrar al panel →'}
          </button>
        </form>

        <p style={{
          textAlign: 'center', marginTop: '24px',
          fontSize: '12px',
          color: 'rgba(var(--color-verde-oscuro-rgb), 0.4)',
        }}>
          Contraseña en <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>.env.local</code>
        </p>
      </div>
    </main>
  )
}