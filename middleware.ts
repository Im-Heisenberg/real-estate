import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";
export async function middleware(request: NextRequest) {
	if (request.method === "POST") {
		return NextResponse.next();
	} else if (request.method === "GET") {
		const cookieStore = await cookies();
		const authToken = cookieStore.get("firebaseAuthToken")?.value;
        if (!authToken) {
            // user is not signed in
			return NextResponse.redirect(new URL("/", request.url));
        }
        const decodedToken = decodeJwt(authToken);
        if (!decodedToken?.admin) {
            // if not admin , go to '/' route
            return NextResponse.redirect(new URL('/',request.url))
        }
	}
}

export const config = {
	matcher: ["/admin-dashboard"],
};
