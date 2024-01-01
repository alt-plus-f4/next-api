import { User } from './user-model';
import { db } from '@/lib/db'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextAuthOptions, getServerSession } from 'next-auth'
// import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user = {
          id: token.id || '',
          name: token.name,
          email: token.email,
          image: token.picture,
        } as User;
      }

      return session
    },

    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email || '',
        },
      })

      if (!dbUser?.name) {
        token.id = user!.id || ''
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        balance: dbUser.balance,
      }
    },
    redirect() {
      return '/'
    },
  },
}

export const getAuthSession = () => getServerSession(authOptions)