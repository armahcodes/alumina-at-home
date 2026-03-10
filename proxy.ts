import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/account"];

export default function proxy(request: NextRequest) {
  const { hostname, pathname, search } = request.nextUrl;

  // Canonicalize: redirect www → non-www
  if (hostname === "www.aluminawellness.com") {
    const url = new URL(`https://aluminawellness.com${pathname}${search}`);
    return NextResponse.redirect(url, 301);
  }

  const sessionToken = request.cookies.get("better-auth.session_token");

  const isAuthPage = pathname.startsWith("/auth");
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Redirect unauthenticated users to sign-in
  if (isProtectedRoute && !sessionToken) {
    const signInUrl = new URL("/auth/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Redirect authenticated users away from auth pages
  if (isAuthPage && sessionToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
