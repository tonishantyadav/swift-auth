import authConfig from '@/auth.config'
import NextAuth from 'next-auth'
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from './routes'

const { auth: middleware } = NextAuth(authConfig)

export default middleware((req) => {
  const session = req.auth
  const nextUrl = req.nextUrl

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return
  } else if (isAuthRoute) {
    if (session)
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
  } else if (!session && !isPublicRoute) {
    return Response.redirect(new URL('/auth/login', nextUrl))
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
