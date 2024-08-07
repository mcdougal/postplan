DO $$ BEGIN
 CREATE TYPE "public"."instagram_sync_source" AS ENUM('InstagramBasicApi', 'RapidApiInstagramBulkProfileScrapper');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "postplan"."instagram_sync_history_item" ADD COLUMN "sync_source" "instagram_sync_source" NOT NULL;