import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient, UserRole } from '@prisma/client'
import NextAuth from 'next-auth'
import authConfig from './auth.config'

declare module 'next-auth' {
  interface User {
    userRole: UserRole
  }
}

const prisma = new PrismaClient()

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
      const userRole = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { userRole: true },
      })

      return session && session.user
        ? {
            ...session,
            user: { ...session.user, ...userRole, id: token.sub },
          }
        : session
    },
  },
  session: { strategy: 'jwt' },
  ...authConfig,
})
