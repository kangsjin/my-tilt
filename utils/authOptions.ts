import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";
import { AuthOptions, DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on succeessful sign in
    async signIn({ profile }) {
      //1. Connect to the database
      await connectDB();
      //2. check if user exists
      const userExists = await User.findOne({ email: profile?.email });
      //3. if not, create user
      if (!userExists) {
        //Truncate username if too long
        const username = profile?.name?.slice(0, 20);
        await User.create({
          email: profile?.email,
          username: username,
          image: profile?.image,
          bookmarks: [],
        });
      }
      return true;
      //4. return true to allow sign in
    },
    async session({ session }) {
      //1. Get user from database
      const user = await User.findOne({ email: session?.user?.email });
      //2. Assign user id from the session
      session.user.id = user._id.toString();
      //3. return session
      return session;
    },
  },
};
