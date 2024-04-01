import { PrismaAdapter } from '@auth/prisma-adapter'
import { UserRole } from '@prisma/client'
import NextAuth from 'next-auth'
import authConfig from './auth.config'
import prisma from './prisma/client'

declare module 'next-auth' {
  interface User {
    userRole: UserRole
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  // trustHost: true,
  callbacks: {
    async session({ token, session }) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { userRole: true, emailVerified: true },
      })

      let emailVerified
      if (user)
        emailVerified = user.emailVerified ? user.emailVerified : new Date()

      return session && session.user && user
        ? {
            ...session,
            user: {
              ...session.user,
              id: token.sub,
              userRole: user.userRole,
              emailVerified,
            },
          }
        : session
    },
  },
  session: { strategy: 'jwt' },
  ...authConfig,
})
