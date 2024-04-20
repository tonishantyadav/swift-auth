import authConfig from '@/auth.config'
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from '@/routes'
import NextAuth from 'next-auth'

const { auth: middleware } = NextAuth(authConfig)

export default middleware((req) => {
  const session = req.auth
  const nextUrl = req.nextUrl

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)

  if (nextUrl.pathname === '/auth/reset/password' && !nextUrl.search)
    return Response.redirect(new URL('/auth/signin', nextUrl))

  if (nextUrl.pathname === '/auth/verify/email' && !nextUrl.search)
    return Response.redirect(new URL('/auth/signin', nextUrl))

  if (isApiAuthRoute) return

  if (isAuthRoute) {
    if (session)
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    return
  }
  if (!session && !isPublicRoute)
    return Response.redirect(new URL('/auth/signin', nextUrl))
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
