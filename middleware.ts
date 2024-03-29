import NextAuth from 'next-auth'
import authConfig from './auth.config'

const { auth: middleware } = NextAuth(authConfig)

export default middleware((req) => {
  const session = req.auth
  if (!session) console.log('Not logged in')
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
