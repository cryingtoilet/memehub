import { type Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./src/server/db/schema.ts",
  url: process.env.DATABASE_URL,
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || "",
  },
} as Config;
