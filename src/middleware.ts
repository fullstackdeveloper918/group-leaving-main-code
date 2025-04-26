import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const userToken = request.cookies.get('auth_token')?.value;
  // const username:any = request.cookies.get('Username') || ''; // Default to empty string if undefined
  // const password:any = request.cookies.get('Password') || '';

  // const correctUsername = 'abhay@gmail.com';
  // const correctPassword = 'Abhay@123';

  console.log('userToken', userToken);
  // console.log('Retrieved Username:', username);
  // console.log('Retrieved Password:', password);

  // if (username === correctUsername && password === correctPassword) {
  //   return NextResponse.redirect(new URL("/multistep_form", request.url));
  // } 
  // return NextResponse.next();

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
    "/share/:path*",
    "/card/boardpay/:path*",
    "/account/:path*",
    // Optionally, apply to other paths if needed
  ],
}
