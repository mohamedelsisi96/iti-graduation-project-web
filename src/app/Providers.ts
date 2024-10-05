import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { auth } from "./firebaseConfig";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "your-email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const dbuser = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );
          return {
            email: credentials.email,
            password: credentials.password,
          };
        } catch (error) {
          return error;
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ baseUrl, url }) {
      return `${baseUrl}/redirect`;
    },
  },

  pages: {
    signIn: "/login",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: null, // If set to null, the new user page is disabled
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day in seconds
  },
  jwt: {},
};
