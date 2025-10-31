import { sql } from "drizzle-orm/sql";
import { db } from "./db/connection";

export async function migrate() {
  db.run(
    sql`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      password TEXT NOT NULL
    );
  `
  );
}

if (import.meta.url === process.argv[1]) {
  migrate()
    .then(() => console.log("Migration completed"))
    .catch(console.error);
}
