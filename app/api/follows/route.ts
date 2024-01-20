import { NextResponse } from 'next/server';

import { getJWTPayload } from '@/app/utils/auth';
import { sql } from '@/db';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request?.url);
  const userId = searchParams?.get('user_id');
  if (!userId)
    return NextResponse.json({ error: 'user id is required' }, { status: 400 });

  const jwtPayload = await getJWTPayload();

  const res = await sql(
    `select * from follows where user_id = $1 and follower_id = $2`,
    [userId, jwtPayload?.sub]
  );
  return NextResponse.json({ data: res.rows });
};

export const POST = async (request: Request) => {
  const jwtPayload = await getJWTPayload();
  const body = await request.json();
  if (!body?.user_id)
    return NextResponse.json({ error: 'user id is required' }, { status: 400 });

  const res = await sql(
    `select * from follows where user_id = $1 and follower_id = $2`,
    [body?.user_id, jwtPayload?.sub]
  );

  if (res.rowCount && res.rowCount > 0)
    return NextResponse.json({ error: 'already following' }, { status: 400 });

  await sql(`insert into follows (user_id, follower_id) values ($1, $2)`, [
    body?.user_id,
    jwtPayload?.sub,
  ]);

  return NextResponse.json({ msg: 'followed successfully' });
};
