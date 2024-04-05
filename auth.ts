import { PrismaAdapter } from '@auth/prisma-adapter'
import { UserRole } from '@prisma/client'
import NextAuth from 'next-auth'
import authConfig from './auth.config'
import { DateToIST } from './lib/formatDate'
import prisma from './prisma/client'

declare module 'next-auth' {
  interface User {
    userRole: UserRole
    emailVerified: Date
    createdAt: Date
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
      console.log(account)

      if (account?.type === 'credentials') {
        const now = new Date(Date.now() - 6000)
        const nowAt = DateToIST(now)
        const createdAt = DateToIST(user.createdAt)

        return createdAt <= nowAt && !!user.emailVerified ? false : true
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
