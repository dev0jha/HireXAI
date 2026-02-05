import { eq } from "drizzle-orm"

import { db } from "@/db/drizzle"
import { candidateProfiles, recruitersProfiles } from "@/db/schema"
import { attempt } from "@/utils/attempt"
import type { ActionRes } from "@/types/actions"

interface UserProfileData {
   id: string
   name: string
   email: string
   role: "recruiter" | "candidate"
}

export abstract class ProfileCreationService {
   static async createCandidateProfile(userData: UserProfileData): Promise<ActionRes<void>> {
      const existingProfile = await attempt(() =>
         db
            .select()
            .from(candidateProfiles)
            .where(eq(candidateProfiles.userId, userData.id))
            .limit(1)
      )
      if (!existingProfile.ok) {
         return {
            success: false,
            error: `Failed to check existing profile: ${existingProfile.error.message}`,
         }
      }

      if (existingProfile.data.length > 0) {
         return {
            success: true,
         }
      }

      const candidateCreateResult = await attempt(() =>
         db.insert(candidateProfiles).values({
            userId: userData.id,
            githubUsername: userData.email.split("@")[0],
            score: 0,
            scoreBreakdown: {},
            techStack: [],
            bio: null,
            location: null,
            isVisible: true,
         })
      )

      if (!candidateCreateResult.ok) {
         return {
            success: false,
            error: `Failed to create candidate profile: ${candidateCreateResult.error.message}`,
         }
      }

      return {
         success: true,
      }
   }

   static async createRecruiterProfile(userData: UserProfileData): Promise<ActionRes<void>> {
      const existingProfile = await attempt(() =>
         db
            .select()
            .from(recruitersProfiles)
            .where(eq(recruitersProfiles.userId, userData.id))
            .limit(1)
      )

      if (!existingProfile.ok) {
         return {
            success: false,
            error: `Failed to check existing profile: ${existingProfile.error.message}`,
         }
      }

      if (existingProfile.data.length > 0) {
         return {
            success: true,
         }
      }

      const recruiterCreateResult = await attempt(() =>
         db.insert(recruitersProfiles).values({
            userId: userData.id,
            companyName: "Not specified",
            companyWebsite: "",
         })
      )

      if (!recruiterCreateResult.ok) {
         return {
            success: false,
            error: `Failed to create recruiter profile: ${recruiterCreateResult.error.message}`,
         }
      }

      return { success: true }
   }

   static async createUserProfile(userData: UserProfileData): Promise<ActionRes<void>> {
      switch (userData.role) {
         case "candidate":
            return this.createCandidateProfile(userData)
         case "recruiter":
            return this.createRecruiterProfile(userData)
         default:
            return { success: false, error: `Invalid role: ${userData.role}` }
      }
   }
}
