CREATE TABLE IF NOT EXISTS "postplan"."instagram_connection" (
	"access_token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"instagram_user_id" text NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "postplan"."instagram_connection" ADD CONSTRAINT "instagram_connection_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "postplan"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
