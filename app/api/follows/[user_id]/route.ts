import { NextResponse } from 'next/server';

import { getJWTPayload } from '@/app/utils/auth';
import { sql } from '@/db';

export const DELETE = async (
  request: Request,
  { params }: { params: { user_id: number } }
) => {
  const jwtPayload = await getJWTPayload();
  const { user_id } = params;
  await sql(`delete from follows where user_id = $1 and follower_id = $2`, [
    user_id,
    jwtPayload?.sub,
  ]);

  return NextResponse.json({ msg: 'unfollow successfully done.' });
};
