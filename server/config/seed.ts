import connection from "./db";
import { User } from "../models";

const users: any[] = [];

for (let i = 1; i <= 5; ++i) {
  users.push({ profile: "", name: `User${i}`, email: `user${i}@gmail.com`, phone: `${i}-xxx-xxx-xxxx` });
}

connection.once('open', async () => {
  try {
    await User.deleteMany();
    await Promise.all(users.map(user => User.build(user)));
  } catch (e) { console.error(e); }
  console.log("Finished resetting all collections and seeding users.");
  process.exit();
});