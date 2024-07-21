/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable arrow-body-style */
import { relations, sql } from 'drizzle-orm';
import {
  boolean,
  integer,
  uniqueIndex,
  pgSchema,
  text,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';

import { encryptedText } from './customTypes';

export const schema = pgSchema(`postplan`);

// -----------------------------------------------------------------------------
// Tables
// -----------------------------------------------------------------------------

export const actualPostMediaType = pgEnum(`actual_post_media_type`, [
  `CarouselAlbum`,
  `Image`,
  `Video`,
]);

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

export const actualPost = schema.table(`actual_post`, {
  caption: text(`caption`),
  createdAt: timestamp(`created_at`).defaultNow().notNull(),
  fileName: text(`file_name`).notNull(),
  id: text(`id`).primaryKey(),
  instagramId: text(`instagram_id`).notNull(),
  mediaThumbnailUrl: text(`media_thumbnail_url`),
  mediaThumbnailUrlExpiresAt: timestamp(`media_thumbnail_url_expires_at`),
  mediaType: actualPostMediaType(`media_type`).notNull(),
  mediaUrl: text(`media_url`).notNull(),
  permalink: text(`permalink`).notNull(),
  postedAt: timestamp(`posted_at`).notNull(),
  updatedAt: timestamp(`updated_at`).defaultNow().notNull(),
  userId: text(`user_id`).references(userId, { onDelete: `cascade` }).notNull(),
});

export const hashtagGroup = schema.table(`hashtag_group`, {
  createdAt: timestamp(`created_at`).defaultNow().notNull(),
  displayName: text(`display_name`).notNull(),
  hashtags: text(`hashtags`).array().notNull(),
  id: text(`id`).primaryKey(),
  updatedAt: timestamp(`updated_at`).defaultNow().notNull(),
  userId: text(`user_id`).references(userId, { onDelete: `cascade` }).notNull(),
});

export const instagramConnection = schema.table(`instagram_connection`, {
  accessToken: encryptedText(`access_token`).notNull(),
  createdAt: timestamp(`created_at`).defaultNow().notNull(),
  expiresAt: timestamp(`expires_at`).notNull(),
  id: text(`id`).primaryKey(),
  instagramUserId: text(`instagram_user_id`).notNull(),
  permissions: text(`permissions`).array().notNull(),
  refreshedAt: timestamp(`refreshed_at`),
  updatedAt: timestamp(`updated_at`).defaultNow().notNull(),
  userId: text(`user_id`).references(userId, { onDelete: `cascade` }).notNull(),
});

export const plannedPost = schema.table(`planned_post`, {
  caption: text(`caption`),
  createdAt: timestamp(`created_at`).defaultNow().notNull(),
  id: text(`id`).primaryKey(),
  isReel: boolean(`is_reel`),
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
  mediaThumbnailUrl: text(`media_thumbnail_url`),
  mediaThumbnailUrlExpiresAt: timestamp(`media_thumbnail_url_expires_at`),
  mediaUrl: text(`media_url`).notNull(),
  mediaUrlExpiresAt: timestamp(`media_url_expires_at`),
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

export const userRelations = relations(user, ({ many, one }) => ({
  actualPosts: many(actualPost),
  hashtagGroups: many(hashtagGroup),
  instagramConnection: one(instagramConnection),
  plannedPosts: many(plannedPost),
}));

export const actualPostRelations = relations(actualPost, ({ one }) => ({
  user: one(user, {
    fields: [actualPost.userId],
    references: [user.id],
  }),
}));

export const hashtagGroupRelations = relations(hashtagGroup, ({ one }) => ({
  user: one(user, {
    fields: [hashtagGroup.userId],
    references: [user.id],
  }),
}));

export const instagramConnectionRelations = relations(
  instagramConnection,
  ({ one }) => ({
    user: one(user, {
      fields: [instagramConnection.userId],
      references: [user.id],
    }),
  })
);

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
