import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const userToken = request.cookies.get('auth_token')?.value;

  if(!userToken){
    return NextResponse.redirect(new URL('/login',request.url))
  }
    else{
      return NextResponse.next();
    }
}



// Update matcher configuration to ensure middleware is applied correctly
export const config = {
  matcher: [
    // Apply middleware to specific paths
    // "/multistep_form/:path*",
    // "/dashboard/:path*",
    "/user_list/:path*",
    // "/board/",
    // "/share/:path*",
    "/card/boardpay/:path*",
    "/account/:path*",
    // Optionally, apply to other paths if needed
  ],
}
