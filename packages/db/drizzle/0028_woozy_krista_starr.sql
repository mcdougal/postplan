ALTER TABLE "postplan"."user" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "postplan"."user" DROP COLUMN IF EXISTS "name";