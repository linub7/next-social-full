import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export const middleware = async (request: NextRequest) => {
  const {
    nextUrl: { pathname },
    cookies,
  } = request;

  const authenticatedAPIRoutes = [
    pathname.startsWith('/api/auth/me'),
    pathname.startsWith('/api/auth/signout'),
    pathname.startsWith('/api/users'),
    pathname.startsWith('/api/posts'),
    pathname.startsWith('/api/follows'),
  ];

  if (authenticatedAPIRoutes.includes(true)) {
    const cookie = cookies.get('jwt-token');
    if (!cookie || !cookie?.value) {
      return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
    }
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      await jwtVerify(cookie?.value, secret);
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: 'internal server error' },
        { status: 500 }
      );
    }
  }
};

export const config = {
  matcher: '/:path*',
};
