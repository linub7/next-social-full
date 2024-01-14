import { getClient } from '@/db';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const loadFakeData = async (numUsers: number = 10) => {
  console.log(`executing load fake data. generating ${numUsers}`);

  const client = await getClient();

  await client.connect();
  try {
    await client.query('begin');

    for (let i = 0; i < numUsers; i++) {
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash('password', saltRounds);
      await client.query(
        'insert into public.users (username, password, avatar) values ($1, $2, $3)',
        [faker.internet.userName(), hashedPassword, faker.image.avatar()]
      );
    }

    const res = await client.query(
      'select id from public.users order by created_at desc limit $1',
      [numUsers]
    );

    for (const row of res.rows) {
      for (let index = 0; index < Math.ceil(Math.random() * 10); index++) {
        await client.query(
          'insert into public.posts (user_id, content) values ($1, $2)',
          [row.id, faker.lorem.sentence()]
        );
      }
    }

    for (const row1 of res.rows) {
      for (const row2 of res.rows) {
        if (row1.id !== row2.id) {
          if (Math.random() > 0.5) {
            await client.query(
              'insert into follows (user_id, follower_id) values ($1, $2)',
              [row1.id, row2.id]
            );
          }
        }
      }
    }

    await client.query('commit');
  } catch (error) {
    console.log('error: ', error);
    await client.query('rollback');
    throw error;
  } finally {
    await client.end();
  }
};
const numUsers = parseInt(process.argv[2]) || 10;
loadFakeData(numUsers);
