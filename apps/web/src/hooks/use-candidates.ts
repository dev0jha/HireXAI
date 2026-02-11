"use client"

import { useQuery } from "@tanstack/react-query"

import type { CandidatesQuery } from "@/lib/queries/query.types"
import { candidateQueries } from "@/lib/queries/queryOptions"

export function useCandidates(query: CandidatesQuery = {}) {
   const { data: response, isLoading, error, refetch } = useQuery(candidateQueries.list(query))

   const candidates = (response as any)?.candidates ? (response as any).candidates : []
   const meta = (response as any)?.meta ? (response as any).meta : undefined
   const errorMessage = (response as any)?.error ? (response as any).error : null

   return {
      data: candidates,
      meta,
      isLoading,
      error,
      errorMessage,
      refetch,
   }
}
