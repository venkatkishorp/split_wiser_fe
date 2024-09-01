import { NextResponse } from "next/server";

export default function middleware(req) {
    let user = req.cookies.get('userCookie');
    let url = req.url;
    let { pathname } = req.nextUrl;
    const protectedRoutes = ["/allGroups", 
                             "/createGroup", 
                             "/groupTrans", 
                             "/addTrans", 
                             "/assignItems", 
                             "/cameraProp", 
                             "/manualSplit", 
                             "/groupTrans"];

    if (!user) {
        if ((() => {
            for (let route in protectedRoutes) {
                console.log('Route: ', pathname, route);
                if (pathname.includes(protectedRoutes[route])) {
                    console.log('Route found: ', route);
                    return true;
                }
            }
    
            console.log('\n\nRoute not found: ');
            return false;
        })()) {
            console.log('Check passed');
            return NextResponse.redirect('http://localhost:8080/signin');
        }
        else {
            return NextResponse.next();
        }
    }
    else if (user) {
        return NextResponse.next();
    }
}