DO $$ BEGIN
 CREATE TYPE "public"."instagram_api_source" AS ENUM('InstagramBasicApi', 'RapidApiInstagramBulkProfileScrapper');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."instagram_sync_job_status" AS ENUM('Failed', 'InProgress', 'Succeeded');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "postplan"."instagram_sync_job" (
	"api_source" "instagram_api_source" NOT NULL,
	"batch_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"cursor" text,
	"ended_at" timestamp,
	"id" text PRIMARY KEY NOT NULL,
	"started_at" timestamp NOT NULL,
	"status" "instagram_sync_job_status" NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "postplan"."actual_post" ADD COLUMN "height" integer;--> statement-breakpoint
ALTER TABLE "postplan"."actual_post" ADD COLUMN "media_url_expires_at" timestamp;--> statement-breakpoint
ALTER TABLE "postplan"."actual_post" ADD COLUMN "sync_job_id" text;--> statement-breakpoint
ALTER TABLE "postplan"."actual_post" ADD COLUMN "width" integer;--> statement-breakpoint
ALTER TABLE "postplan"."user" ADD COLUMN "instagram_username" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "postplan"."instagram_sync_job" ADD CONSTRAINT "instagram_sync_job_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "postplan"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "postplan"."actual_post" ADD CONSTRAINT "actual_post_sync_job_id_instagram_sync_job_id_fk" FOREIGN KEY ("sync_job_id") REFERENCES "postplan"."instagram_sync_job"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
