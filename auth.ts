import authConfig from '@/auth.config'
import prisma from '@/prisma/client'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { UserRole } from '@prisma/client'
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    userRole: UserRole | null
    emailVerified: Date | null
    createdAt: Date | null
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
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  events: {
    // Verify the email of those accounts that are connected with oAuth providers.
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    },
  },
  callbacks: {
    async signIn({ account, user }) {
      if (account?.type === 'credentials') {
        const existingUser = await prisma.user.findUnique({
          where: { id: user.id },
        })
        return existingUser?.emailVerified ? true : false
      }
      return true
    },
    async session({ token, session }) {
      const userRole = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { userRole: true },
      })
      return session && session.user
        ? {
            ...session,
            user: {
              ...session.user,
              ...userRole,
              id: token.sub,
            },
          }
        : session
    },
  },
  session: { strategy: 'jwt' },
  ...authConfig,
})
