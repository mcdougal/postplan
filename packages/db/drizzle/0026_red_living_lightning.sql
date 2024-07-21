ALTER TABLE "postplan"."actual_post" ADD COLUMN "media_thumbnail_url_expires_at" timestamp;--> statement-breakpoint
ALTER TABLE "postplan"."planned_post_media_item" ADD COLUMN "media_thumbnail_url_expires_at" timestamp;--> statement-breakpoint
ALTER TABLE "postplan"."planned_post_media_item" ADD COLUMN "media_url_expires_at" timestamp;