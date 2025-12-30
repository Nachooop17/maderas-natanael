import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Solo protegemos la ruta /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    // Verificamos si existe la cookie
    const cookie = request.cookies.get('admin_session')

    // Si no tiene la cookie, lo pateamos al login
    if (!cookie) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  return NextResponse.next()
}

// Configuración para que solo afecte a rutas específicas si quieres optimizar
export const config = {
  matcher: '/admin/:path*',
}