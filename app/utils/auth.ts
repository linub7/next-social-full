import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

import { sql } from '@/db';
import { NextResponse } from 'next/server';

export const getJWTPayload = async () => {
  const cookiesStore = cookies();
  const token = cookiesStore.get('jwt-token');
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const { payload, protectedHeader } = await jwtVerify(token?.value!, secret);

  return payload;
};

export const authorizeAdmin = async (func: Function) => {
  const jwtPayload = await getJWTPayload();
  const res = await sql(`select is_admin from users where id = $1`, [
    jwtPayload?.sub,
  ]);

  const data = res.rows[0];

  if (!data?.is_admin)
    return NextResponse.json({ error: 'unauthorized' }, { status: 403 });

  return func();
};
