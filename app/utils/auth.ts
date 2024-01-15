import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export const getJWTPayload = async () => {
  const cookiesStore = cookies();
  const token = cookiesStore.get('jwt-token');
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const { payload, protectedHeader } = await jwtVerify(token?.value!, secret);

  return payload;
};
