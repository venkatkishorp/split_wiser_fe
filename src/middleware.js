import { NextResponse } from "next/server";

export default function middleware(req) {
    let user = req.cookies.get('userCookie');
    let { pathname } = req.nextUrl;
    /**
     * Keep adding the new routes into the protected routes list
     */
    const protectedRoutes = ["/allGroups", 
                             "/createGroup", 
                             "/groupTrans", 
                             "/addTrans", 
                             "/assignItems", 
                             "/cameraProp", 
                             "/manualSplit", 
                             "/groupTrans"];

    if (!user) {
        /**
         * The anonymous function in this if condition is checking through the protexted routes if the pathname exists in it or not
         */
        if ((() => {
            for (let route in protectedRoutes) {
                console.log('Route: ', pathname, route);
                if (pathname.includes(protectedRoutes[route])) {
                    console.log('Route found: ', route);
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