import { useState, useMemo } from "react"
import type { Developer } from "@/types"
import { mockDevelopers } from "@/data/mock-data"

const techOptions = ["All", "React", "TypeScript", "Node.js", "Python", "Go", "AWS", "Docker"]

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

   // Filter logic
   const visibleDevelopers = useMemo(
      () => mockDevelopers.filter(dev => dev.isOpenToRecruiters && dev.score >= 80),
      []
   )

   const filteredDevelopers = useMemo(() => {
      return visibleDevelopers.filter(dev => {
         const matchesSearch =
            dev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dev.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
         const matchesTech = techFilter === "All" || dev.techStack.some(tech => tech === techFilter)
         return matchesSearch && matchesTech
      })
   }, [visibleDevelopers, searchQuery, techFilter])

   const sortedDevelopers = useMemo(() => {
      const sorted = [...filteredDevelopers]
      switch (sortBy) {
         case "score-desc":
            return sorted.sort((a, b) => b.score - a.score)
         case "score-asc":
            return sorted.sort((a, b) => a.score - b.score)
         case "name-asc":
            return sorted.sort((a, b) => a.name.localeCompare(b.name))
         default:
            return sorted.sort((a, b) => b.score - a.score)
      }
   }, [filteredDevelopers, sortBy])

   const topDevelopers = useMemo(() => sortedDevelopers.slice(0, 3), [sortedDevelopers])
   const listDevelopers = useMemo(() => sortedDevelopers.slice(3), [sortedDevelopers])

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

      // Computed values
      techOptions,
      sortOptions,
      topDevelopers,
      listDevelopers,
      filteredCount: filteredDevelopers.length,

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
