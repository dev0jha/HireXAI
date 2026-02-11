"use client"

import { useState } from "react"
import { useDebounce } from "@/hooks/use-debounce"
import { useCandidates } from "@/hooks/use-candidates"
import type { Candidate } from "@/lib/queries/query.types"

export type CandidateStatus = "interested" | "pending" | "not-interested"
export type CadidateStatusFilter = CandidateStatus | "all"

export function useCandidatesPage() {
   const [searchQuery, setSearchQuery] = useState("")
   const [statusFilter, setStatusFilter] = useState<CadidateStatusFilter>("all")

   const debouncedSearchQuery = useDebounce(searchQuery, 300)

   const {
      data: candidates,
      isLoading,
      error,
      refetch,
   } = useCandidates({
      search: debouncedSearchQuery,
      status: statusFilter,
      sort: "score-desc",
   })

   const filteredCandidates = candidates.filter((candidate: Candidate) => {
      const matchesStatus = statusFilter === "all" || candidate.status === statusFilter
      return matchesStatus
   })

   const handleRemove = (id: string) => {
      console.log("Remove candidate:", id)
   }

   return {
      candidates,
      filteredCandidates,
      searchQuery,
      setSearchQuery,
      statusFilter,
      setStatusFilter,
      isLoading,
      error,

      filteredCount: filteredCandidates.length,

      handleRemove,
      refetch,
   }
}
