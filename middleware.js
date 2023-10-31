import { NextResponse } from "next/server";

export async function middleware(request) {
  // get the pathname
  const path = request.nextUrl.pathname;

  // define public paths here
  const isPublicPath =
    path === "/sign-in" ||
    path === "/sign-up" ||
    path === "/forgot-password" ||
    path === "/expert/sign-in" ||
    path === "/expert/sign-up";

  // is expert path
  const IsExpertPath = request.nextUrl.pathname.startsWith("/expert");

  // get token from cookies
  const token = request.cookies.get("token")?.value;

  // get token from cookies
  const userType = request.cookies.get("userType")?.value * 1;

  // check if token is valid
  let isValidToken = false;

  if (token) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/checkToken`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.status) {
        isValidToken = true;
      } else {
        isValidToken = false;
      }
    } catch (error) {
      // log error message
      console.error(
        "An error occurred while checking the token:",
        error.message
      );
    }
  }

  // if (token) redirect to dashboard page
  if (isPublicPath && isValidToken) {
    // return NextResponse.redirect(new URL("/dashboard", request.url));
    if (IsExpertPath) {
      return NextResponse.redirect(new URL("/expert/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // if no token, redirect home page
  if (!isPublicPath && !isValidToken) {
    if (IsExpertPath) {
      return NextResponse.redirect(new URL("/expert/sign-in", request.url));
    }
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // User Type check
  if (userType) {
    // customer routes
    if (IsExpertPath && userType === 4) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // expert routes
    if (!IsExpertPath && userType === 3) {
      return NextResponse.redirect(new URL("/expert/dashboard", request.url));
    }
  }
}

// "Matching Paths"
export const config = {
  matcher: [
    "/expert/sign-in/:path*",
    "/expert/sign-up/:path*",
    "/expert/dashboard/:path*",
    "/sign-in/:path*",
    "/sign-up/:path*",
    "/forgot-password/:path*",
    "/dashboard/:path*",
  ],
};
