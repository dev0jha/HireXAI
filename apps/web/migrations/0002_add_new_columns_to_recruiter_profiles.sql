ALTER TABLE "recruiter_profiles" ADD COLUMN "position" text;--> statement-breakpoint
ALTER TABLE "recruiter_profiles" ADD COLUMN "is_public_profile" boolean DEFAULT true NOT NULL;