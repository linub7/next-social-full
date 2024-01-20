import { NextResponse } from 'next/server';

import { getJWTPayload } from '@/app/utils/auth';
import { sql } from '@/db';

export const GET = async (request: Request) => {
  const jwtPayload = await getJWTPayload();
  const { searchParams } = new URL(request?.url);
  const username = searchParams.get('username');
  const page =
    (searchParams?.get('page') && parseInt(searchParams?.get('page')!)) || 0;

  const limit = 3;
  const offset = page * limit;

  const statement = `select p.*, u.avatar, u.username
                       from posts p inner join users u
                       on p.user_id = u.id where user_id = $1
                       order by created_at desc limit $2 offset $3`;

  if (username) {
    // TODO
  }

  const res = await sql(statement, [jwtPayload?.sub, limit, offset]);

  return NextResponse.json({ data: res.rows });
};

export const POST = async (request: Request) => {
  const body = await request.json();
  if (!body?.content || body?.content?.length < 10)
    return NextResponse.json({
      error: 'Content is required and must be at least 10 characters',
    });

  const jwtPayload = await getJWTPayload();
  const userId = jwtPayload?.sub;
  const res = await sql(
    `insert into posts (user_id, content) values ($1, $2) returning *`,
    [userId, body?.content]
  );
  return NextResponse.json(
    { status: 'success', data: res.rows[0] },
    { status: 201 }
  );
};
