import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const protectedRoutes = [
    "/buyer",
    "/redirect",
    "/admin",
    "/student",
    "/instructor",
  ];

  const pathName = request.nextUrl.pathname;

  // Retrieve the authentication token
  const isAuth = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Read user type from cookies
  const userType = request.cookies.get("userType")?.value;

  // Check if the path is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathName.startsWith(route)
  );

  // Check if the current path is the login route
  const isAuthRoute = pathName.startsWith("/login");

  // Redirect unauthenticated users trying to access protected routes to the login page
  if (!isAuth && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect authenticated users away from login page to the home page
  if (isAuth && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Role-based redirection: Check if the user is already on the correct page to avoid loops
  if (userType === "admin" && !pathName.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin/home", request.url));
  } else if (
    (userType === "buyer" || userType === "applicant") &&
    !pathName.startsWith("/buyer")
  ) {
    return NextResponse.redirect(new URL("/buyer", request.url));
  } else if (userType === "student" && !pathName.startsWith("/student")) {
    return NextResponse.redirect(new URL("/student", request.url));
  } else if (userType === "instructor" && !pathName.startsWith("/instructor")) {
    return NextResponse.redirect(new URL("/instructor", request.url));
  }

  // Continue to the next middleware or route
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/buyer/:path*",
    "/redirect",
    "/student/:path*",
    "/instructor/:path*",
    "/admin/:path*",
  ],
};
