import { boolean, pgTable, text } from "drizzle-orm/pg-core"

import { user } from "@/db/schema/auth.schema"

export const recruitersProfiles = pgTable("recruiter_profiles", {
   userId: text("user_id")
      .primaryKey()
      .references(() => user.id, { onDelete: "cascade" }),
   companyName: text("company_name").notNull(),
   companyWebsite: text("company_website"),
   position: text("position"),
   isVerified: boolean("is_verified").default(false).notNull(),
   isPublicProfile: boolean("is_public_profile").default(true).notNull(),
})

export type RecruiterProfile = typeof recruitersProfiles.$inferSelect

export type InsertRecruiterProfile = typeof recruitersProfiles.$inferInsert

export type UpdateRecruiterProfile = Partial<InsertRecruiterProfile>
