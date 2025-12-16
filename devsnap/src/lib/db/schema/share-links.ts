import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { snapshots } from "./snapshots";

export const shareLinks = pgTable("share_links", {
  id: text("id").primaryKey(),
  snapshotId: text("snapshot_id")
    .notNull()
    .references(() => snapshots.id, { onDelete: "cascade" }),
  slug: text("slug").notNull().unique(),
  visibility: text("visibility", { 
    enum: ["public", "unlisted", "private"] 
  }).default("public").notNull(),
  password: text("password"), // Hashed password for private links
  viewCount: integer("view_count").default(0).notNull(),
  expiresAt: timestamp("expires_at", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export type ShareLink = typeof shareLinks.$inferSelect;
export type NewShareLink = typeof shareLinks.$inferInsert;

