import { NextRequest, NextResponse } from 'next/server'
import { createSession, deleteSession, cleanSessions } from '@/lib/db'

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({ password: '' }))

  const expected = process.env.ADMIN_PASSWORD
  if (!expected) {
    return NextResponse.json(
      { error: 'ADMIN_PASSWORD no configurado en .env.local' },
      { status: 500 }
    )
  }

  if (password !== expected) {
    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 })
  }

  cleanSessions()
  const token = createSession()

  const res = NextResponse.json({ ok: true })
  res.cookies.set('admin_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24h
    path: '/',
  })
  return res
}

export async function DELETE(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value ?? ''
  if (token) deleteSession(token)

  const res = NextResponse.json({ ok: true })
  res.cookies.delete('admin_token')
  return res
}