import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import { loadEnvConfig } from '@next/env';

import { sql } from '@/db';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

export const POST = async (request: Request) => {
  const json = await request.json();

  if (!json?.username || !json?.password || !json?.confirmPassword)
    return NextResponse.json(
      { error: 'Password and username and confirmPassword is required' },
      { status: 400 }
    );

  if (json?.username === 'admin')
    return NextResponse.json(
      { error: 'Invalid username, please try another.' },
      { status: 400 }
    );

  if (json?.password?.length < 5)
    return NextResponse.json(
      { error: 'Password must be at least 4 characters' },
      { status: 400 }
    );

  if (json?.password !== json?.confirmPassword)
    return NextResponse.json({ error: 'Passwords mismatch' }, { status: 400 });

  const res = await sql(
    'select id, username from users where username ilike $1',
    [json?.username]
  );
  if (res.rowCount && res.rowCount > 0)
    return NextResponse.json(
      { error: 'Username already exists, please use another' },
      { status: 400 }
    );

  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(json?.password, saltRounds);

  await sql('insert into users (username, password) values ($1, $2)', [
    json?.username,
    hashedPassword,
  ]);

  return NextResponse.json(
    {
      status: 'success',
      message: 'Registration was successfully',
    },
    {
      status: 201,
    }
  );
};
