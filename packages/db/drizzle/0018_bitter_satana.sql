DO $$ BEGIN
 CREATE TYPE "public"."actual_post_media_type" AS ENUM('CarouselAlbum', 'Image', 'Video');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "instaplan"."actual_post" (
	"caption" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"instagram_id" text NOT NULL,
	"media_type" "actual_post_media_type" NOT NULL,
	"media_url" text NOT NULL,
	"permalink" text NOT NULL,
	"posted_at" timestamp NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "instaplan"."actual_post" ADD CONSTRAINT "actual_post_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "instaplan"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
