/**
 * middleware.ts  (raíz del proyecto)
 * Protege todas las rutas  /admin/*  salvo  /admin/login
 */

import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/db'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Solo actúa en /admin/**
  if (!pathname.startsWith('/admin')) return NextResponse.next()

  // La página de login no necesita protección
  if (pathname === '/admin/login') return NextResponse.next()

  const token = req.cookies.get('admin_token')?.value ?? ''

  // Nota: validateSession usa SQLite, que funciona en Node runtime.
  // En Edge runtime no funcionaría, pero Next.js App Router usa Node por defecto.
  try {
    if (!validateSession(token)) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  } catch {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
  runtime: 'nodejs',
}