import { neonAuthMiddleware } from "@neondatabase/auth/next/server";

export default neonAuthMiddleware({
  // Redirects unauthenticated users to sign-in page
  loginUrl: "/auth/sign-in",
});

export const config = {
  matcher: [
    // Protected routes requiring authentication
    "/dashboard/:path*",
    "/protocols/:path*",
    "/supplements/:path*",
    "/progress/:path*",
    "/profile/:path*",
    "/account/:path*",
  ],
};
