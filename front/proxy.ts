import { getSessionCookie } from 'better-auth/cookies';
import { NextResponse } from 'next/server'
import { NextRequest } from "next/server";

export default function proxy(req: NextRequest) {
    const sessionCookie = getSessionCookie(req)
    console.log(sessionCookie)
    const fakeLogin = false
    if (!sessionCookie || fakeLogin) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
    return NextResponse.next()
}


export const config = {
    matcher: ['/']
}