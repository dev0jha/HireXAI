"use client"

import { apiClient } from "@/lib/eden"
import { queryKeys } from "./queryKeys"

export interface DevelopersQuery {
   search?: string
   tech?: string
   sort?: "score-desc" | "score-asc" | "name-asc"
   page?: number
   limit?: number
}

export interface Developer {
   id: string
   name: string
   email: string
   username: string
   bio?: string | null
   location?: string | null
   linkedIn?: string | null
   website?: string | null
   techStack: string[]
   score: number
   isVisible: boolean
   createdAt: Date
}

export interface DevelopersResponse {
   developers: Developer[]
   meta: {
      page: number
      limit: number
      total: number
      totalPages: number
      hasNext: boolean
      hasPrev: boolean
   }
}

export interface TechStackResponse {
   techStacks: string[]
}

export interface ContactRequestQuery {
   page?: number
   limit?: number
   status?: "pending" | "accepted" | "rejected"
}

export interface ContactRequest {
   id: string
   recruiterId: string
   candidateId: string
   message: string | null
   status: "pending" | "accepted" | "rejected"
   createdAt: Date
   recruiterName: string | null
   recruiterCompany: string | null
   recruiterEmail: string | null
}

export interface ContactRequestResponse {
   data: ContactRequest[]
   meta: {
      page: number
      limit: number
      total: number
      totalPages: number
      hasNext: boolean
      hasPrev: boolean
   }
}

export const contactRequestQueryOptions = {
   all: (query: ContactRequestQuery = {}) => ({
      queryKey: queryKeys.contactRequests.list(query),
      queryFn: async () => {
         const response = await apiClient["contact-requests"].get({ query })

         if (response.error) {
            throw new Error("Failed to fetch contact requests")
         }

         if (!response.data?.success) {
            throw new Error(response.data?.message || "Failed to fetch contact requests")
         }

         return {
            data: response.data.data as ContactRequest[],
            meta: response.data.meta as ContactRequestResponse["meta"],
         }
      },
      staleTime: 1000 * 60 * 2, // 2 minutes
   }),
}

export const updateContactRequestMutationOptions = {
   mutationFn: async ({
      requestId,
      status,
   }: {
      requestId: string
      status: "accepted" | "rejected"
   }) => {
      const response = await apiClient["contact-requests"]({ requestId }).patch({ status })

      if (response.error) {
         throw new Error("Failed to update contact request")
      }

      if (!response.data?.success) {
         throw new Error(response.data?.error || "Failed to update contact request")
      }

      return response.data.data as ContactRequest
   },
}

export const createContactRequestMutationOptions = {
   mutationFn: async ({ candidateId, message }: { candidateId: string; message: string }) => {
      const response = await apiClient["contact-requests"].post({
         candidateId,
         message,
      })

      if (response.error) {
         throw new Error("Failed to send contact request")
      }

      if (!response.data?.success) {
         throw new Error(response.data?.error || "Failed to send contact request")
      }

      return response.data as ContactRequest
   },
}

export const developersQueryOptions = {
   all: (query: DevelopersQuery = {}) => ({
      queryKey: queryKeys.developers.list(query),
      queryFn: async () => {
         const response = await apiClient.developers.get({ query })

         if (response.error) {
            throw new Error("Failed to fetch developers")
         }

         return response.data
      },
      staleTime: 1000 * 60 * 2, // 2 minutes
   }),
   techStacks: () => ({
      queryKey: queryKeys.developers.techStacks(),
      queryFn: async () => {
         const response = await apiClient.developers["tech-stacks"].get()

         if (response.error) {
            throw new Error("Failed to fetch tech stacks")
         }

         return response.data
      },
      staleTime: 1000 * 60 * 10, // 10 minutes - tech stacks change rarely
   }),
}
