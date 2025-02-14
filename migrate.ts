import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import postgres from "postgres";
import * as dotenv from "dotenv";
dotenv.config();
import * as schema from "./src/server/db/schema"; // Import your schema
import { env } from "./src/env";

const client = postgres(env.DATABASE_URL, { max: 1 });

const db = drizzle(client, { schema });

async function main() {
  try {
    console.log("Running migrations...");
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migration complete!");
  } catch (error) {
    console.error("Error running migration:", error);
  } finally {
    await client.end();
  }
}

main();
