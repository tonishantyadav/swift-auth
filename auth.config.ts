import Credentials from 'next-auth/providers/credentials'

import type { NextAuthConfig } from 'next-auth'

export default {
  providers: [
    Credentials({
      async authorize(user) {
        return user ? user : null
      },
    }),
  ],
} satisfies NextAuthConfig
