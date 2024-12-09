import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./lib/db";
import bcrypt from "bcryptjs";

// Your own logic for dealing with plaintext password strings; be careful!

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials: any) => {
        try {
          // Check if user is trying to sign up
          // Check if user already exists
          const existingUser = await db.user.findFirst({
            where: { email: credentials.email },
          });

          if (!existingUser) {
            // Hash password before storing
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            // Create new user
            const user = await db.user.create({
              data: {
                email: credentials.email,
                password: hashedPassword,
              },
            });
            return user;
          }

          if (existingUser) {
            // Handle sign in
            const user = await db.user.findFirst({
              where: { email: credentials.email },
            });

            if (!user) {
              throw new Error("No user found");
            }

            // Compare password with hashed password in database
            const isPasswordValid = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (!isPasswordValid) {
              throw new Error("Invalid password");
            }

            return user;

            // throw new Error("User already exists");
          }

          return credentials;
        } catch (error) {
          // Return `null` to indicate that the credentials are invalid
          return null;
        }
      },
    }),
  ],
  // pages: {
  //   signIn: "/", // Disable the sign-in page
  //   signOut: "/", // Disable the sign-out page
  //   error: "/", // Disable the error page
  //   verifyRequest: "/", // Disable the verify request page
  //   newUser: "/", // Disable the new user page
  // },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      // console.log({ token });
      return token;
    },
    session: async ({ session, token }: any) => {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      // console.log({ session });
      return session;
    },
  },
});
