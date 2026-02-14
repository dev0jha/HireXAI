"use client"

import { useQuery } from "@tanstack/react-query"

import type { CandidatesQuery, CandidatesResponse, Candidate } from "@/lib/queries/query.types"
import { candidateQueries } from "@/lib/queries/queryOptions"

export function useCandidates(query: CandidatesQuery = {}) {
   const { data: response, isLoading, error, refetch } = useQuery(candidateQueries.list(query))

   const candidates: Candidate[] = response?.candidates ?? []
   const meta = response?.meta
   const errorMessage = error?.message ?? null

   return {
      data: candidates,
      meta,
      isLoading,
      error,
      errorMessage,
      refetch,
   }
}
