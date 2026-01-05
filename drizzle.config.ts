import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Explicitly load .env.local
dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/lib/schema.ts",  // আপনার schema path
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Must exist
  },
});
