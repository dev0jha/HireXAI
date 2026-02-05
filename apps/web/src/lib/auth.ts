import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { openAPI } from "better-auth/plugins"

import { db } from "@/db/drizzle"
import { userRoles } from "@/db/schema/enums"
import { ProfileCreationService } from "@/server/services/profile-creation.service"

export const auth = betterAuth({
   database: drizzleAdapter(db, {
      provider: "pg",
   }),
   emailAndPassword: {
      enabled: true,
   },
   user: {
      additionalFields: {
         role: {
            type: userRoles.enumValues,
            required: true,
            defaultValue: "recruiter",
         },
      },
   },
   databaseHooks: {
      user: {
         create: {
            after: async user => {
               const result = await ProfileCreationService.createUserProfile({
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  role: user.role as "recruiter" | "candidate",
               })

               if (!result.success) {
                  console.error("Failed to create user profile:", result.error)
               }
            },
         },
      },
   },
   plugins: [openAPI(), nextCookies()],
})
