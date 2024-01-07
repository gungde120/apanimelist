export { default } from "next-auth/middleware"

// Protect some url when dont sign in
export const config = { matcher: ["/users/:path*"] }