"use client"

import { useQuery } from "@tanstack/react-query"

import type { DevelopersQuery, DevelopersResponse } from "@/lib/queries/query.types"
import { developerQueries } from "@/lib/queries/queryOptions"

export function useDevelopers(query: DevelopersQuery = {}) {
   const { data: response, isLoading, error, refetch } = useQuery(developerQueries.list(query))

   const developers = response?.developers ?? []
   const meta = response?.meta
   const errorMessage = error?.message ?? null

   return {
      data: developers,
      meta,
      isLoading,
      error,
      errorMessage,
      refetch,
   }
}

export function useTechStacks() {
   const { data: response, isLoading, error, refetch } = useQuery(developerQueries.techStacks())

   const techStacks = response?.techStacks ?? []
   const errorMessage = error?.message ?? null

   return {
      data: techStacks,
      isLoading,
      error,
      errorMessage,
      refetch,
   }
}
