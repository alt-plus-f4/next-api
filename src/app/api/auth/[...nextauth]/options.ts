import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials'; 

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jdoe" },
                password: { label: "Password", type: "password", placeholder: "password"}
            },        
            async authorize(credentials) {
                const user = {id: 1, name: 'John Doe', email: '', image: '', password: ''};
                if(credentials?.username === user.name && credentials?.password === user.password) {
                    return user;
                }
                else return null;
            }
        })
    ],
    // pages: {
    //     signIn: '/signin',
    //     signOut: '/signout',
    //     error: '/error',
    //     verifyRequest: '/auth/verify-request',
    //     newUser: undefined,
    // },
    secret: process.env.NEXTAUTH_SECRET!,
}