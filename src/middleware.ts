import { NextRequest, NextResponse } from 'next/server'
import { NextURL } from 'next/dist/server/web/next-url'
import { getToken } from "next-auth/jwt"


 
// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: '/api/user/:path*',
}
 
export async function middleware(req:NextRequest) {

  const token = await getToken({req}).then((token) => {return token?.access_token})

  if(!token){
    // return NextResponse.redirect(new NextURL("/",req.nextUrl))
  }

}