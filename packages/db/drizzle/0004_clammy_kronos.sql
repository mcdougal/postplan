ALTER TABLE "postplan"."post" RENAME TO "planned_post";--> statement-breakpoint
ALTER TABLE "postplan"."post_item" RENAME TO "planned_post_media_item";--> statement-breakpoint
ALTER TABLE "postplan"."planned_post_media_item" RENAME COLUMN "post_id" TO "planned_post_id";--> statement-breakpoint
ALTER TABLE "postplan"."planned_post" DROP CONSTRAINT "post_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "postplan"."planned_post_media_item" DROP CONSTRAINT "post_item_post_id_post_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "postplan"."planned_post" ADD CONSTRAINT "planned_post_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "postplan"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "postplan"."planned_post_media_item" ADD CONSTRAINT "planned_post_media_item_planned_post_id_planned_post_id_fk" FOREIGN KEY ("planned_post_id") REFERENCES "postplan"."planned_post"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
