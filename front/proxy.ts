import { NextResponse } from 'next/server'
import { NextRequest } from "next/server";

export default function proxy(req: NextRequest) {
    return NextResponse.redirect(new URL('/login', req.url))
}


export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.\.png$).)']
}