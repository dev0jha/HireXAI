import { t, type Static } from "elysia"

export const updateUserBodySchema = t.Object({
   name: t.Optional(t.String()),
   company: t.Optional(t.String()),
   position: t.Optional(t.String()),
   bio: t.Optional(t.String()),
   location: t.Optional(t.String()),
   website: t.Optional(t.String()),
   isOpenToRecruiters: t.Optional(t.Boolean()),
   isPublicProfile: t.Optional(t.Boolean()),
})

export type UpdateUserBody = Static<typeof updateUserBodySchema>
