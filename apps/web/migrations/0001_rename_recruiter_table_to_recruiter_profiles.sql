ALTER TABLE "recruiters" RENAME TO "recruiter_profiles";--> statement-breakpoint
ALTER TABLE "recruiter_profiles" DROP CONSTRAINT "recruiters_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "recruiter_profiles" ADD CONSTRAINT "recruiter_profiles_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;