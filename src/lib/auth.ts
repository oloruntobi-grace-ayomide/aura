import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'
import { prisma } from "./db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { Session } from "next-auth"

const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (raw) => {
        try {
          const { email, password } = (raw ?? {}) as { email?: string; password?: string }
          if (!email || !password) return null
      
          const user = await prisma.user.findUnique({ where: { email } })
          if (!user || !user.password) return null
      
          const ok = await bcrypt.compare(password, user.password)
          if (!ok) return null
      
          return { id: user.id, email: user.email, name: user.name }
        } catch {
          throw new Error("Internal server error")
        }
      }
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    newUser: "/onboarding" // first sign-in only
  },
  callbacks: {
    async session({ session }: { session: Session }) {
      try {
        if (session.user?.email) {
          const u = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { onboarded: true }
          })
          ;(session.user as any).onboarded = !!u?.onboarded
        }
        return session
      } catch(error) {
        console.error("Session callback error", error);
        return session
      }
    }
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)

