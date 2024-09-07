import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { auth, firestore } from "@/lib/firebaseConfig"; // Adjust the path if needed
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const authOptionsConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Sign in with Firebase Authentication
          const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
          const user = userCredential.user;
          
          if (user) {
            // Fetch additional user data from Firestore
            const userDoc = await getDoc(doc(firestore, "users", user.uid));
            
            if (userDoc.exists()) {
              const userData = userDoc.data();
              return {
                id: user.uid,
                email: user.email,
                userType: userData.userType, 
                userID : userDoc.id
              };
            } else {
              return null;
            }
          }
        } catch (error) {
          console.error("Error signing in:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.userType = user.userType; // Add userType to token
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};

export default NextAuth(authOptionsConfig);
