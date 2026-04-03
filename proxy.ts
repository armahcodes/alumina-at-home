import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionToken = getSessionCookie(request);

  const isAuthPage = pathname.startsWith("/auth");

  if (isAuthPage && sessionToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isAuthPage && !sessionToken) {
    const signInUrl = new URL("/auth/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon\\.ico|sitemap\\.xml|robots\\.txt|manifest\\.json|alumina-isotipo\\.webp|icon|apple-icon).*)",
  ],
};
