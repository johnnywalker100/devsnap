import { pgTable, text, timestamp, primaryKey } from "drizzle-orm/pg-core";

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (token) => [
    primaryKey({ columns: [token.identifier, token.token] }),
  ]
);

export type VerificationToken = typeof verificationTokens.$inferSelect;

