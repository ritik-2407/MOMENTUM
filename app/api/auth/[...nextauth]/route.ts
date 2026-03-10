import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "../../../lib/db/db";
import User from "../../../lib/models/User.model";
import bcryptjs from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        await connectDB();

        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing username or password");
        }

        const user: any = await User.findOne({ username: credentials.username });
        if (!user) {
          throw new Error("Invalid username");
        }

        const isPasswordCorrect = await bcryptjs.compare(credentials.password, user.password);
        if (!isPasswordCorrect) {
          throw new Error("Invalid password");
        }

        return { id: user._id.toString(), username: user.username };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = (user as any).username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).username = token.username;
      }
      return session;
    }
  },
  pages: {
    // signin: "/login", // Optional: specify custom login page later
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };