import { NextRequest, NextResponse } from 'next/server'
import { validateSession, getDb } from '@/lib/db'

function auth(req: NextRequest): boolean {
  return validateSession(req.cookies.get('admin_token')?.value ?? '')
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!auth(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { id } = await params
  const numId = Number(id)
  if (isNaN(numId)) return NextResponse.json({ error: 'ID inválido' }, { status: 400 })

  const db = getDb()
  const info = db.prepare('DELETE FROM imagenes_override WHERE id = ?').run(numId)

  if (info.changes === 0) {
    return NextResponse.json({ error: 'Override no encontrado' }, { status: 404 })
  }
  return NextResponse.json({ ok: true })
}