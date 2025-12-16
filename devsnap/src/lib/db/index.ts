import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

// Only create the database connection if DATABASE_URL is set
const createDb = () => {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL is not set. Database operations will fail.");
    return null;
  }
  const sql = neon(process.env.DATABASE_URL);
  return drizzle(sql, { schema });
};

export const db = createDb();

export type Database = NonNullable<typeof db>;
