import authConfig from '@/auth.config'
import NextAuth from 'next-auth'

const apiAuthPrefix = '/api/auth'
const publicRoutes = ['/']
const authRoutes = ['/auth/login', '/auth/register']

const { auth: middleware } = NextAuth(authConfig)

export default middleware((req) => {
  const session = req.auth
  const nextUrl = req.nextUrl

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) return
  if (isAuthRoute) {
    if (session)
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    return
  }
  if (!session && !isPublicRoute)
    return Response.redirect(new URL('/auth/login', nextUrl))
})

export const DEFAULT_LOGIN_REDIRECT = '/'

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
