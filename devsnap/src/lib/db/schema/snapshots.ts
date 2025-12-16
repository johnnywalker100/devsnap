import { pgTable, text, timestamp, jsonb, integer } from "drizzle-orm/pg-core";
import { users } from "./users";

export const snapshots = pgTable("snapshots", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  
  // Captured data stored as JSON
  osData: jsonb("os_data").$type<{
    platform: string;
    arch: string;
    version: string;
  }>(),
  
  editorData: jsonb("editor_data").$type<{
    name: string;
    version: string;
    extensions: Array<{
      id: string;
      name: string;
      version: string;
      publisher: string;
    }>;
    settings: Record<string, unknown>;
  }>(),
  
  shellData: jsonb("shell_data").$type<{
    type: string;
    config: string;
    theme?: string;
    plugins?: string[];
  }>(),
  
  gitData: jsonb("git_data").$type<{
    userName: string;
    userEmail: string;
    aliases: Record<string, string>;
  }>(),
  
  runtimes: jsonb("runtimes").$type<Array<{
    name: string;
    version: string;
    manager?: string;
  }>>(),
  
  packages: jsonb("packages").$type<Array<{
    name: string;
    version: string;
    source: string;
  }>>(),
  
  // Metadata
  cliVersion: text("cli_version"),
  capturedAt: timestamp("captured_at", { mode: "date" }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export type Snapshot = typeof snapshots.$inferSelect;
export type NewSnapshot = typeof snapshots.$inferInsert;

