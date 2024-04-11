import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export { default } from "next-auth/middleware"

export const middleware = async (req) => {
    // Add your own logic here or extend the middleware provided by NextAuth
    const token = await getToken({ req, secret: process.env.SECRET })
    const { pathname } = req.nextUrl

    // if (pathname.startsWith("/dashboard") && (!token || !(token.role === "ADMIN" || token.role === "ORGANISATEUR"))) {
    //     // Redirect to login if the user is not authenticated
    //     return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login`)
    //   }
    

    return NextResponse.next()
    }

    export const config = { matcher: ["/dashboard/:path*"] }