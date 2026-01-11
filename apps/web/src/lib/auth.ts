import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "@/db/drizzle"
import { openAPI } from "better-auth/plugins"
import { nextCookies } from "better-auth/next-js"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [openAPI(), nextCookies()],
})

