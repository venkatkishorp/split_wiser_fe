import { NextResponse } from "next/server";

export default function middleware(req) {
    let user = req.cookies.get('userCookie');
    let url = req.url;

    console.log(req.nextUrl.origin);

    if (!user && url.includes('/allGroups')) {
        return NextResponse.redirect('http://localhost:8080/');
    }
}