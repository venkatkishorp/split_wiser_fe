import { NextResponse } from "next/server";

export default function middleware(req) {
	let user = req.cookies.get('userCookie');
	let { pathname } = req.nextUrl;
	/**
	 * Keep adding the new routes into the protected routes list
	 */
	const protectedRoutes = [
		"/allGroups", 
		"/createGroup", 
		"/groupTrans", 
		"/addTrans", 
		"/assignItems", 
		"/cameraProp", 
		"/manualSplit", 
		"/groupTrans"
	];

	if (!user) {
		if ((() => {
			for (let route in protectedRoutes) {
				if (pathname.includes(protectedRoutes[route])) {
					return true;
				}
			}
			return false;
		})()) {
			return NextResponse.redirect(`${process.env.BASE_URL}/signin`);
		}
		else {
			return NextResponse.next();
		}
	}
	else if (user) {
		return NextResponse.next();
	}
}