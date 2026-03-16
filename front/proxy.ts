import { getSessionCookie } from 'better-auth/cookies';
import { NextResponse } from 'next/server'
import { NextRequest } from "next/server";

export default function proxy(req: NextRequest) {
    const sessionCookie = process.env.DISABLE_AUTH == "true" ? "token" : getSessionCookie(req)
    const isLoginPage = req.url.includes("/login")
    if (!sessionCookie && !isLoginPage) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
    if (sessionCookie && isLoginPage) {
        return NextResponse.redirect(new URL("/", req.url))
    }
    return NextResponse.next()
}


export const config = {
    matcher: ['/', '/login']
}