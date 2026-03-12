import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  const guestRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];

  const protectedRoutes = [
    "/cart",
    "/account",
    "/account/address",
    "/account/coupons",
    "/account/notifications",
    "/account/orders",
    "/account/payment",
    "/account/security",
  ];

  const isGuestRoute = guestRoutes.some((route) => pathname.startsWith(route));

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (accessToken) {
    if (isGuestRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
