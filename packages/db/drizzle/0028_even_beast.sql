CREATE TABLE IF NOT EXISTS "postplan"."instagram_sync_history_item" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"sync_started_at" timestamp NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "postplan"."actual_post" ADD COLUMN "height" integer;--> statement-breakpoint
ALTER TABLE "postplan"."actual_post" ADD COLUMN "width" integer;--> statement-breakpoint
ALTER TABLE "postplan"."user" ADD COLUMN "instagram_username" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "postplan"."instagram_sync_history_item" ADD CONSTRAINT "instagram_sync_history_item_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "postplan"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
