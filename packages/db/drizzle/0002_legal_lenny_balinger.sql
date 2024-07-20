ALTER TABLE "postplan"."user" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "emailUniqueIndex" ON "postplan"."user" USING btree (lower("email"));