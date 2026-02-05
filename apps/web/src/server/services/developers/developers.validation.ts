import { t } from "elysia"

export const developersQuerySchema = t.Partial(
   t.Object({
      search: t.Optional(t.String()),
      tech: t.Optional(t.String()),
      sort: t.Optional(
         t.Enum({ "score-desc": "score-desc", "score-asc": "score-asc", "name-asc": "name-asc" })
      ),
      page: t.Optional(t.Numeric({ minimum: 1 })),
      limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100 })),
   })
)

export const techStackResponseSchema = t.Object({
   techStacks: t.Array(t.String()),
})

export const developersResponseSchema = t.Object({
   developers: t.Array(
      t.Object({
         id: t.String(),
         name: t.String(),
         email: t.String(),
         username: t.String(),
         bio: t.Nullable(t.String()),
         location: t.Nullable(t.String()),
         linkedIn: t.Nullable(t.String()),
         website: t.Nullable(t.String()),
         techStack: t.Array(t.String()),
         score: t.Number(),
         isVisible: t.Boolean(),
         createdAt: t.Date(),
      })
   ),
   meta: t.Object({
      page: t.Number(),
      limit: t.Number(),
      total: t.Number(),
      totalPages: t.Number(),
      hasNext: t.Boolean(),
      hasPrev: t.Boolean(),
   }),
})
