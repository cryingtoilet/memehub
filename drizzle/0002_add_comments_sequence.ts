import { sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  primaryKey,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { memes } from "~/server/db/schema";

export const comments = pgTable("comments", {
  id: integer("id").primaryKey(),
  memeId: integer("meme_id")
    .notNull()
    .references(() => memes.id),
  userId: text("user_id").notNull(),
  text: text("text").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const memeRelations = relations(memes, ({ many }) => ({
  comments: many(comments),
}));

export const commentRelations = relations(comments, ({ one }) => ({
  meme: one(memes, {
    fields: [comments.memeId],
    references: [memes.id],
  }),
}));

export async function up(db: any) {
  await db.execute(sql`CREATE SEQUENCE IF NOT EXISTS comments_id_seq;`);
}

export async function down(db: any) {
  await db.execute(sql`DROP SEQUENCE IF EXISTS comments_id_seq;`);
}
