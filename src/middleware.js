import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(req) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!session || !session.role || (session.role !== 'ADMIN' && session.role !== 'ORGANISATEUR')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
}