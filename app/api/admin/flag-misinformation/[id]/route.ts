import { NextResponse } from 'next/server';

import { authorizeAdmin } from '@/app/utils/auth';
import { sql } from '@/db';

export const PATCH = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  return authorizeAdmin(async () => {
    const { id } = params;
    console.log(`flagging ${id} as misinformation`);
    await sql(
      `update posts set is_misinformation = true, is_misinformation_flagged_at = now() where id = $1`,
      [id]
    );
    return NextResponse.json({ msg: 'flagged as misinformation' });
  });
};
