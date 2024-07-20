CREATE TABLE IF NOT EXISTS "postplan"."hashtag_group" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"display_name" text NOT NULL,
	"hashtags" text[] NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "postplan"."hashtag_group" ADD CONSTRAINT "hashtag_group_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "postplan"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
