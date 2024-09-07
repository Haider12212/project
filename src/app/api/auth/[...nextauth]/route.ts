import NextAuth from "next-auth"
import { authOptionsConfig } from "@/lib/authOptions"
export const handler = NextAuth(authOptionsConfig)

export {handler as GET , handler as POST}