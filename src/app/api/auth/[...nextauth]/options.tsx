import { AuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export const options: AuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials.password) return null;

          const user = (
            await db
              .select()
              .from(users)
              .where(eq(users.email, credentials.email))
              .limit(1)
          )[0];
          console.log(credentials.email);
          console.log(user);
          if (!user) return null;

          const checkPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!checkPassword) return null;

          return user;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session }) => {
      console.log(session);
      const user = (
        await db
          .select()
          .from(users)
          .where(
            or(
              eq(users.name, session.user.name),
              eq(users.email, session.user.email)
            )
          )
      )[0];
      if (user) {
        // set image
        if (!user.image)
          await db
            .update(users)
            .set({ image: session.user.image })
            .where(eq(users.name, session.user.name));

        session.user.id = user.id;
        session.user.name = user.name;
        session.user.email = user.email;
        session.user.password = user.password;
        session.user.image = user.image;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
