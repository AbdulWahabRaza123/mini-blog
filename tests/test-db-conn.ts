import { db } from '@/lib/db';
import { users } from '@/schemas/schema';
import test from 'node:test';
const testDb=async()=>{
const allUsers = await db.select().from(users);
console.log(allUsers);
}
test('Test Database Connection', async (t) => {
  await t.test('Fetch all users', async () => {
    await testDb();
  });
});
