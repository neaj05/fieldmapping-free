import { type NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const sessionId = request.cookies.get("session-id")?.value

  // Public routes
  if (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register") {
    // Allow access to login/register pages
    return NextResponse.next()
  }

  // Protected routes
  if (
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/capture") ||
    request.nextUrl.pathname.startsWith("/parcels")
  ) {
    if (!sessionId) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // Session validation happens client-side
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/capture/:path*", "/parcels/:path*", "/login", "/register"],
}
