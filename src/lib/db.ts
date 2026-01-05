import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as dotenv from "dotenv";

// Load .env.local
dotenv.config({ path: ".env.local" });

// Create a Postgres connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Drizzle ORM instance
export const db = drizzle(pool);

export { pool };
