ALTER TABLE "postplan"."instagram_connection" ADD COLUMN "instagram_user_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "postplan"."instagram_connection" ADD COLUMN "permissions" text[] NOT NULL;