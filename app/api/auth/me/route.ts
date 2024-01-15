import { NextResponse } from 'next/server';

import { sql } from '@/db';
import { getJWTPayload } from '@/app/utils/auth';

export const GET = async (req: Request) => {
  // get currently logged in user
  const jwtPayload = await getJWTPayload();
  // fetch user data
  const res = await sql(
    'select id, username, avatar from users where id = $1',
    [jwtPayload.sub]
  );
  // return user data
  const user = res.rows[0];
  return NextResponse.json({ data: user });
};
