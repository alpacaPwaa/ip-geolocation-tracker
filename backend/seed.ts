import { db } from "./db/connection";
import { users } from "./db/schema";
import { migrate } from "./migrate";

async function seed() {
  console.log("🌱 Running migrations...");
  await migrate();

  console.log("🌱 Seeding users...");

  db.insert(users)
    .values([
      { email: "alice@example.com", password: "alice12345" },
      { email: "bob@example.com", password: "bob12345" },
      {
        email: "charlie@example.com",
        password: "charlie12345",
      },
    ])
    .run();

  console.log("✅ Drizzle seed complete");
}

seed();
