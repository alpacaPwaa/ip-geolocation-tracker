import express from "express";
import { db } from "./db/connection";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

/**
 * GET /api/users
 * Returns all users
 */

app.get("/api/users", (req, res) => {
  const allUsers = db.select().from(users).all();
  res.json(allUsers);
});

/**
 * POST /api/users
 * Adds a new user
 */
app.post("/api/users", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" });
  }

  db.insert(users).values({ email, password }).run();
  res.json({ message: "✅ User added successfully" });
});

/**
 * POST /api/login
 * Verifies user email & password
 */
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = db.select().from(users).where(eq(users.email, email)).get();

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (user.password !== password) {
    return res.status(401).json({ error: "Invalid password" });
  }

  res.json({ message: "✅ Login successful", user });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
