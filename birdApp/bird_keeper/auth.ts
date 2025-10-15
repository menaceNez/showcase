import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
// import postgres from "postgres";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { z } from "zod";
// import bcrypt from "bcryptjs";
// import { User as userD } from "./app/lib/types/User";
// import { User } from "next-auth";

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: false });

// async function getUser(username: string) {
//   try {
//     // const user = await sql<User[]>`SELECT * FROM users WHERE username=${username}`;
//     const user = await sql<
//       userD[]
//     >`SELECT * FROM users WHERE username = ${username}`;
//     // console.log("EXPLAIN WHAT IS GOING ON: ", user);

//     return user[0];
//   } catch (error) {
//     console.error("failed to fetch user: ", error);
//     throw new Error("failed to fetch user");
//   }
// }

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig 
});
