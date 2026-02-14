import type { ContactStatus } from "@/db/schema/enums"
import type { RequestContext } from "@/server/services/types/context.types"

export interface GetContactReqCtx extends RequestContext {
   query: ContactRequestQuery
}

export interface CreateContactReqCtx extends RequestContext {
   body: {
      candidateId: string
      message: string
   }
}

export interface UpdateContactReqCtx extends RequestContext {
   query: ContactRequestQuery
   params: {
      requestId: string
   }
   body: {
      status: ContactStatus
   }
}

export interface ContactRequestQuery {
   page?: number
   limit?: number
   status?: ContactStatus
}

export interface ContactRequestResponse {
   data: Array<{
      id: string
      recruiterId: string
      candidateId: string
      message: string | null
      status: ContactStatus
      createdAt: Date
      recruiterName: string | null
      recruiterCompany: string | null
      recruiterEmail: string | null
   }>
   meta: {
      page: number
      limit: number
      total: number
      totalPages: number
      hasNext: boolean
      hasPrev: boolean
   }
}
