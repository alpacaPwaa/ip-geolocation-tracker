import { db } from "./db/connection";
import { users } from "./db/schema";

async function main() {
  const allUsers = db.select().from(users).all();
  console.log(allUsers);
}

main();
