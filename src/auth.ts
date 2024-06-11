import NextAuth from 'next-auth'

import CredentialsProvider from 'next-auth/providers/credentials'
import { createConnection, executeQuery } from '@/utils/mysql'
import { User } from '@/types'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      async authorize(c) {
        const connection = await createConnection()
        try {
          const res = await executeQuery<User[], string[]>(
            connection,
            'SELECT * from Users WHERE login = ? AND password = ?',
            [c.login as string, c.password as string]
          )

          if (res.length === 1) {
            return { name: c.login as string, id: res[0].id.toString() }
          } else {
            return null
          }
        } catch (e) {
          return null
        }
      },
    }),
  ],
  pages: { signIn: '/login' },
  callbacks: {
    async signIn() {
      return true
    },
    async redirect({ baseUrl }) {
      return baseUrl
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id as string
      return session
    },
  },
})
