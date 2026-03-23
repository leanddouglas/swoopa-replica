import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Mock authorization. In production this verifies against the Swoopa DB using Prisma/fetch
        if (credentials?.email && credentials?.password) {
          return { id: "1", name: "Swoopa User", email: credentials.email, tier: "pro" };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).tier = token.tier;
        (session.user as any).id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.tier = (user as any).tier;
      }
      return token;
    }
  }
});

export { handler as GET, handler as POST };
