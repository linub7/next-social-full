import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import { loadEnvConfig } from '@next/env';

import { sql } from '@/db';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

export const POST = async (request: Request) => {
  const json = await request.json();
  if (!json?.username || !json?.password) {
    return NextResponse.json(
      { error: 'Password and username is required' },
      { status: 400 }
    );
  }

  if (json?.password?.length < 5) {
    return NextResponse.json(
      { error: 'Password must be at least 4 characters' },
      { status: 400 }
    );
  }

  const res = await sql(
    'select id, username, password from users where username ilike $1',
    [json?.username]
  );
  // ilike -> case insensitive
  if (res.rowCount === 0) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 404 });
  }
  const user = res.rows[0];
  const match = await bcrypt.compare(json?.password, user?.password);
  if (!match) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user?.id)
    .setIssuedAt()
    .setExpirationTime('2w')
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  const response = NextResponse.json({
    status: 'success',
    msg: 'signed in successfully',
  });
  response.cookies.set('jwt-token', token, {
    sameSite: 'strict',
    httpOnly: true,
    secure: true,
  });
  return response;
};
