import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'

const dbFile = process.env.SQLITE_FILE || 'dev.sqlite'
const sqlite = new Database(dbFile)
export const db = drizzle(sqlite)
