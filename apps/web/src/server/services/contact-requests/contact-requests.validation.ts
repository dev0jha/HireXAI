import { t } from "elysia"

export const contactRequestQuerySchema = t.Object({
   page: t.Optional(t.Numeric({ minimum: 1 })),
   limit: t.Optional(t.Numeric({ minimum: 1, maximum: 50 })),
   status: t.Optional(
      t.Union([t.Literal("pending"), t.Literal("accepted"), t.Literal("rejected")])
   ),
})

export const createContactRequestSchema = t.Object({
   candidateId: t.String({
      minLength: 1,
      error: "Candidate ID is required",
   }),
   message: t.String({
      minLength: 10,
      maxLength: 1000,
      error: "Message must be between 10 and 1000 characters",
   }),
})

export const updateContactRequestSchema = t.Object({
   status: t.Union([t.Literal("pending"), t.Literal("accepted"), t.Literal("rejected")]),
})
