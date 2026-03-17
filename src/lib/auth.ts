import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './prisma'
import { getResend, FROM_EMAIL } from './resend'
import bcrypt from 'bcryptjs'
import type { UserRole, LoyaltyTier } from '@prisma/client'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      from: FROM_EMAIL,
      sendVerificationRequest: async ({ identifier, url }) => {
        await getResend().emails.send({
          from: FROM_EMAIL,
          to: identifier,
          subject: 'Sign in to SilverSprinter',
          html: `<p>Click <a href="${url}">here</a> to sign in to SilverSprinter.</p>`,
        })
      },
    }),
    CredentialsProvider({
      name: 'Dispatcher Login',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })
        if (!user || !user.password) return null
        if (!['DISPATCHER', 'SUPER_ADMIN'].includes(user.role)) return null
        const valid = await bcrypt.compare(credentials.password, user.password)
        if (!valid) return null
        return { id: user.id, email: user.email, name: user.name, role: user.role }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        const dbUser = await prisma.user.findUnique({ where: { id: user.id } })
        if (dbUser) {
          token.role = dbUser.role
          token.loyaltyTier = dbUser.loyaltyTier
          token.loyaltyPoints = dbUser.loyaltyPoints
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as UserRole
        session.user.loyaltyTier = token.loyaltyTier as LoyaltyTier
        session.user.loyaltyPoints = token.loyaltyPoints as number
      }
      return session
    },
  },
}
