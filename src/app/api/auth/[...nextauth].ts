import NextAuth, { Profile } from 'next-auth'
import Providers from 'next-auth/providers'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
  ],
callbacks: {
    async session(params: { session: any; token: any; user: any; newSession: any; trigger: any }) {
        const { session, token, user } = params;
        session.userId = user.id;
        return session;
    },
    async signIn(params) {
        const { email, name, image } = params.profile as Profile;
        
        await prisma.user.upsert({
            where: { email: email },
            update: { email: email ?? '', name: name ?? '', image: image ?? '' },
            create: { email: email ?? '', name: name ?? '', image: image ?? '' }
        })
        return true
    }
}
})