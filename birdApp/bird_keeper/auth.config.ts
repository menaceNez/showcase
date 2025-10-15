/**
 * AuthConfig callbacks will be called on every request 
 */
import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { User } from "next-auth";
import { getUser } from "./app/lib/data/db";

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 60*8,
  },
providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // console.log("AUTHORIZED CREDENTAISL ##############", credentials);
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(4)})
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          const user = await getUser(username);

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          const userTwo: User = { 
            id: user.id, 
            name: user.id, 
            email: user.username, 
            username: user.username, 
            role: user.role 
          };

          if (passwordsMatch && userTwo.email) {
            // localStorage.setItem('user', userTwo.email);
            return userTwo;
          }
        }

        console.log("Returning null inside authorize() auth.ts (2)");
        return null;
      },
    }),
  ],
  callbacks: { // attach user data to session
    async session({session, token}) {
      session.user.username = token.username;
      session.user.id = token.id;
      session.user.role = token.role;

      return session; 
    },
    async jwt({token, user}) {
      if(user) {
        token.email = user.email;
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    }
  }

} as NextAuthConfig
  // callbacks: {
  //   authorized({auth, request: {nextUrl}}) { // typically 
  //     console.log("what is the nexturl?: ", auth, nextUrl)
  //     const isLoggedIn = !!auth?.user;
  //     const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')

  //     if(isOnDashboard) {
  //       if(isLoggedIn) return true;

  //       return false;
  //     }
  //     else if (isLoggedIn) {

  //       return true;
  //     }

  //     return false;
  //   }
  // },
  // providers: []