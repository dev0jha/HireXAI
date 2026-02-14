import { useState } from "react"
import type { Developer } from "@/types"
import { useDevelopers, useTechStacks } from "@/hooks/use-developers"
import { useDebounce } from "@/hooks/use-debounce"

const sortOptions = [
   { value: "score-desc", label: "Score (High to Low)" },
   { value: "score-asc", label: "Score (Low to High)" },
   { value: "name-asc", label: "Name (A to Z)" },
]

export function useDiscoverPage() {
   const [searchQuery, setSearchQuery] = useState("")
   const [techFilter, setTechFilter] = useState<string>("All")
   const [sortBy, setSortBy] = useState("score-desc")
   const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(null)
   const [modalOpen, setModalOpen] = useState(false)

   const debouncedSearchQuery = useDebounce(searchQuery, 300)

   const {
      data: developers,
      meta,
      isLoading,
      errorMessage: developersError,
   } = useDevelopers({
      search: debouncedSearchQuery || undefined,
      tech: techFilter === "All" ? undefined : techFilter,
      sort: sortBy as "score-desc" | "score-asc" | "name-asc",
      page: 1,
      limit: 100,
   })

   const { data: techStacks, isLoading: techStacksLoading } = useTechStacks()

   const techOptions = ["All", ...techStacks]

   console.log("Fetched developers:", developers)

   const transformedDevelopers: Developer[] = developers.map(dev => ({
      ...dev,
      role: "developer" as const, // Add the required role field
      bio: dev.bio || undefined, // Convert null to undefined
      location: dev.location || undefined, // Convert null to undefined
      linkedIn: dev.linkedIn || undefined, // Convert null to undefined
      website: dev.website || undefined, // Convert null to undefined
      isOpenToRecruiters: dev.isVisible, // Map isVisible to isOpenToRecruiters
      analyzedRepos: [], // Empty for now, could be fetched later
   }))

   const topDevelopers = transformedDevelopers.slice(0, 3)
   const listDevelopers = transformedDevelopers.slice(3)

   const handleContact = (developer: Developer) => {
      setSelectedDeveloper(developer)
      setModalOpen(true)
   }

   const handleCloseModal = () => {
      setModalOpen(false)
      setSelectedDeveloper(null)
   }

   const handleTechFilterChange = (value: string | null) => {
      setTechFilter(value || "All")
   }

   const handleSortChange = (value: string | null) => {
      setSortBy(value || "score-desc")
   }

   return {
      // State
      searchQuery,
      techFilter,
      sortBy,
      selectedDeveloper,
      modalOpen,
      isLoading,
      developersError,
      techStacksLoading,

      // Computed values
      techOptions,
      sortOptions,
      topDevelopers,
      listDevelopers,
      filteredCount: meta?.total || 0,

      // Actions
      setSearchQuery,
      setTechFilter,
      setSortBy,
      handleTechFilterChange,
      handleSortChange,
      handleContact,
      handleCloseModal,
   }
}
