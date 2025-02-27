import {
  pgTable,
  integer,
  text,
  primaryKey,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const memes = pgTable("memehub_post", {
  id: integer("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  authorId: text("author_id").notNull(),
  likes: integer("likes").default(0),
  dislikes: integer("dislikes").default(0),
  comments: integer("comments").default(0),
});

export const votes = pgTable(
  "votes",
  {
    userId: text("user_id").notNull(),
    memeId: integer("meme_id")
      .notNull()
      .references(() => memes.id),
    isLike: boolean("is_like").notNull(),
  },
  (table) => {
    return {
      pk: primaryKey(table.userId, table.memeId),
    };
  },
);

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
