import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./constants/constant";
import { getUser } from "./app/service/auth";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const data = await getUser();
  if (!data) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = data.role;
  if (role === Roles.admin) {
    if (!pathname.startsWith("/admin-dashboard")) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
  }

  if (role === Roles.customer) {
    if (!pathname.startsWith("/customer-dashboard")) {
      return NextResponse.redirect(new URL("/customer-dashboard", request.url));
    }
  }

  if (role === Roles.provider) {
    if (!pathname.startsWith("/provider-dashboard")) {
      return NextResponse.redirect(new URL("/provider-dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-dashboard/:path*",
    "/customer-dashboard/:path*",
    "/provider-dashboard/:path*",
  ],
};
