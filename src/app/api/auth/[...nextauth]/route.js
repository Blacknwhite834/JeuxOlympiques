// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: {  label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
          where: { email }
        });
        
        if (user && bcrypt.compareSync(password, user.password)) {
          return {
            id: user.id, 
            name: user.name, 
            email: user.email,
            role: user.role,
          };
        }
        
        // Return null if user data could not be retrieved
        
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login',
    newUser: '/register',
  },
  callbacks: {
    async session({ session, token }) {
      // Ici, vous ajoutez `role` à `session.user` en utilisant la propriété du `token`
      // qui a été ajoutée dans le callback `jwt` (si vous utilisez les JWT)
      if (token.role) { // Assurez-vous que token.role est défini
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Si l'utilisateur est défini, cela signifie que l'autorisation a réussi
      // Ajoutez le rôle de l'utilisateur au token pour qu'il puisse être utilisé dans le callback de la session
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  }
  // Add other NextAuth configurations here
});

export {handler as GET, handler as POST};
