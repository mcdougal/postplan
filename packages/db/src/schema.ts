/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable arrow-body-style */
import { relations, sql } from 'drizzle-orm';
import {
  integer,
  uniqueIndex,
  pgSchema,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const schema = pgSchema(`instaplan`);

// -----------------------------------------------------------------------------
// Tables
// -----------------------------------------------------------------------------

export const user = schema.table(
  `user`,
  {
    authUserId: text(`auth_user_id`).notNull(),
    createdAt: timestamp(`created_at`).defaultNow().notNull(),
    email: text(`email`).notNull(),
    id: text(`id`).primaryKey(),
    updatedAt: timestamp(`updated_at`).defaultNow().notNull(),
  },
  (table) => ({
    emailUniqueIndex: uniqueIndex(`emailUniqueIndex`).on(
      sql`lower(${table.email})`
    ),
  })
);

const userId = () => user.id;

export const plannedPost = schema.table(`planned_post`, {
  caption: text(`caption`),
  createdAt: timestamp(`created_at`).defaultNow().notNull(),
  id: text(`id`).primaryKey(),
  order: integer(`order`),
  updatedAt: timestamp(`updated_at`).defaultNow().notNull(),
  userId: text(`user_id`).references(userId, { onDelete: `cascade` }).notNull(),
});

const plannedPostId = () => plannedPost.id;

export const plannedPostMediaItem = schema.table(`planned_post_media_item`, {
  createdAt: timestamp(`created_at`).defaultNow().notNull(),
  fileName: text(`file_name`).notNull(),
  height: integer(`height`).notNull(),
  id: text(`id`).primaryKey(),
  order: integer(`order`),
  plannedPostId: text(`planned_post_id`)
    .references(plannedPostId, { onDelete: `cascade` })
    .notNull(),
  updatedAt: timestamp(`updated_at`).defaultNow().notNull(),
  width: integer(`width`).notNull(),
});

// -----------------------------------------------------------------------------
// Relations
// -----------------------------------------------------------------------------

export const userRelations = relations(user, ({ many }) => ({
  plannedPosts: many(plannedPost),
}));

export const plannedPostRelations = relations(plannedPost, ({ many, one }) => ({
  mediaItems: many(plannedPostMediaItem),
  user: one(user, {
    fields: [plannedPost.userId],
    references: [user.id],
  }),
}));

export const plannedPostMediaItemRelations = relations(
  plannedPostMediaItem,
  ({ one }) => ({
    plannedPost: one(plannedPost, {
      fields: [plannedPostMediaItem.plannedPostId],
      references: [plannedPost.id],
    }),
  })
);
