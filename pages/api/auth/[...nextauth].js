import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import GoogleProviderConfig from '../../../public/GoogleProviderConfig'

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: GoogleProviderConfig.web.client_id,
      clientSecret: GoogleProviderConfig.web.client_secret,
    })
    
  ],
  callbacks: {
    async jwt({ token, account }) {
      
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      return session
    }
  }
 
});