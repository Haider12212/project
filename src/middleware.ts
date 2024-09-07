export { default } from "next-auth/middleware"

export const config = { matcher: ["/doctor-dashboard" , "/patient-dashboard" , "/admin-dashboard", "/patient-onboarding"] }