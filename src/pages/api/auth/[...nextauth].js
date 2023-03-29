import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from 'bcryptjs'

import connectMongo from '@/database/conn'
import Users from '@/models/User'

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "credentials",
            async authorize(credentials, req) {
                await connectMongo()

                const result = await Users.findOne({ email: credentials.email })

                if (!result) {
                    throw new Error("user not fount")
                }

                const isTruePass = await compare(credentials.password, result.password)

                if (!isTruePass) {
                    throw new Error("user not fount")
                }

                return result
            }
        })
    ],
    secret: "CknzYy9K4okz3Y/tQEYJ/fEdgkKYlJgnholJynnSguk="
})