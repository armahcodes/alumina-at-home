import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/account"];

export default function proxy(request: NextRequest) {
  const sessionToken = request.cookies.get("better-auth.session_token");

  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Redirect unauthenticated users to sign-in
  if (isProtectedRoute && !sessionToken) {
    const signInUrl = new URL("/auth/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Redirect authenticated users away from auth pages
  if (isAuthPage && sessionToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/auth/:path*"],
};
