import { getClient } from '@/db';
import bcrypt from 'bcrypt';

const loadAdminUser = async (username: string, password: string) => {
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const client = await getClient();
  await client.connect();
  await client.query(
    'insert into public.users (username, password, is_admin) values ($1, $2, $3)',
    [username, hashedPassword, true]
  );
  await client.end();
};

const username = process.argv[2];
const password = process.argv[3];
loadAdminUser(username, password);
