import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";
export async function middleware(request: NextRequest) {
	if (request.method === "POST") {
		return NextResponse.next();
	}
	const cookieStore = await cookies();
    const authToken = cookieStore.get("firebaseAuthToken")?.value;
    


    // return to homepage if user is not logged in trying to access /login ---> '/login'
	if (!authToken && request.nextUrl.pathname.startsWith("/login")) {
        // return NextResponse.redirect(new URL("/login", request.url));
        return NextResponse.next();
	}
    // return to homepage if user is logged in trying to access /login  ---> '/'
	if (authToken && request.nextUrl.pathname.startsWith("/login")) {
		return NextResponse.redirect(new URL("/", request.url));
	}
	if (!authToken) {
		// user is not signed in
		return NextResponse.redirect(new URL("/", request.url));
	}
	const decodedToken = decodeJwt(authToken);
	if (!decodedToken?.admin) {
		// if not admin , go to '/' route
		return NextResponse.redirect(new URL("/", request.url));
	}
}

export const config = {
	matcher: ["/admin-dashboard", "/admin-dashboard/:path*","/login"],
};
