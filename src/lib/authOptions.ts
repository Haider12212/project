import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { auth, db } from "@/lib/firebaseConfig"; // Adjust the path if needed
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
            const userDoc = await getDoc(doc(db, "users", user.uid));
            
            if (userDoc.exists()) {
              const userData = userDoc.data();
              return {
                id: user.uid,
                email: user.email,
                userType: userData.userType,
                userName: userData.name, // Include the user's name here
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
      // If user exists, add additional properties to the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.userType = user.userType; // Add userType to token
        token.userName = user.userName; // Add userName to token
      }
      return token;
    },
    async session({ session, token }) {
      // Add the custom fields to the session object
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.userType = token.userType;
      session.user.userName = token.userName; // Add userName to session
      return session;
    },
  },
  // Specify custom sign-in page
  pages: {
    signIn: '/authentication', // Point to the custom sign-in page
  },
};

export default NextAuth(authOptionsConfig);
