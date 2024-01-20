import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  const response = NextResponse.json({
    status: 'success',
    msg: 'signout success',
  });
  response.cookies.set('jwt-token', '');
  return response;
};
