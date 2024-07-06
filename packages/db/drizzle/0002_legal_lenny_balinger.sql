ALTER TABLE "instaplan"."user" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "emailUniqueIndex" ON "instaplan"."user" USING btree (lower("email"));