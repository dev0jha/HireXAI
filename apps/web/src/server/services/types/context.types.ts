import type { UserWithRole } from "@/actions/session.actions"
import type { Context } from "elysia/context"

export interface RequestContext {
   user: UserWithRole
   set: Context["set"]
}
