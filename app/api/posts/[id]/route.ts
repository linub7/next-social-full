import { getJWTPayload } from '@/app/utils/auth';
import { sql } from '@/db';
import { NextResponse } from 'next/server';

export const GET = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  const jwtPayload = await getJWTPayload();
  const res = await sql('select * from posts where id = $1 and user_id = $2', [
    params?.id,
    jwtPayload?.sub,
  ]);
  if (res.rowCount === 0)
    return NextResponse.json({ error: 'not found' }, { status: 404 });

  return NextResponse.json({ data: res.rows[0] });
};

export const PATCH = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  const body = await request.json();
  const jwtPayload = await getJWTPayload();
  const res = await sql('select * from posts where id = $1 and user_id = $2', [
    params?.id,
    jwtPayload?.sub,
  ]);
  if (res.rowCount === 0)
    return NextResponse.json({ error: 'not found' }, { status: 404 });

  await sql('update posts set content = $1 where id = $2 and user_id = $3', [
    body.content,
    params?.id,
    jwtPayload?.sub,
  ]);

  return NextResponse.json({ status: 'success', msg: 'Updated successfully!' });
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  const jwtPayload = await getJWTPayload();
  const res = await sql('select * from posts where id = $1 and user_id = $2', [
    params?.id,
    jwtPayload?.sub,
  ]);
  if (res.rowCount === 0)
    return NextResponse.json({ error: 'not found' }, { status: 404 });

  await sql('delete from posts where id = $1 and user_id = $2', [
    params?.id,
    jwtPayload?.sub,
  ]);

  return NextResponse.json({ status: 'success', msg: 'deleted successfully' });
};
