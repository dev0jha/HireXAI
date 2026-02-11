"use client"

import { useQuery } from "@tanstack/react-query"

import { developerQueries } from "@/lib/queries/queryOptions"

export function useDeveloperByUsername(username: string) {
   const {
      data: response,
      isLoading,
      error,
      refetch,
   } = useQuery(developerQueries.byUsername(username))

   const developer = (response as any)?.developer ? (response as any).developer : null
   const errorMessage = (response as any)?.error ? (response as any).error : null

   return {
      data: developer,
      isLoading,
      error,
      errorMessage,
      refetch,
   }
}
