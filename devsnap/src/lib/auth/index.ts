import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import { 
  users, 
  accounts, 
  sessions, 
  verificationTokens 
} from "@/lib/db/schema";

// Create auth config conditionally based on database availability
const getAdapter = () => {
  if (!db) {
    return undefined;
  }
  return DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  });
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: getAdapter(),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: db ? "database" : "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session({ session, user, token }) {
      if (session.user) {
        // Use user.id if using database strategy, token.sub if using JWT
        session.user.id = user?.id ?? token?.sub ?? "";
      }
      return session;
    },
  },
});
