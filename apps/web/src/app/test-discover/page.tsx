"use client"

import { useState } from "react"
import { useDevelopers, useTechStacks } from "@/hooks/use-developers"
import { useDebounce } from "@/hooks/use-debounce"

const sortOptions = [
   { value: "score-desc", label: "Score (High to Low)" },
   { value: "score-asc", label: "Score (Low to High)" },
   { value: "name-asc", label: "Name (A to Z)" },
]

export default function TestDiscoverPage() {
   const [searchQuery, setSearchQuery] = useState("")
   const [techFilter, setTechFilter] = useState<string>("All")
   const [sortBy, setSortBy] = useState("score-desc")

   // Use debounced search for API calls
   const debouncedSearchQuery = useDebounce(searchQuery, 300)

   // Fetch developers with filters
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

   // Fetch tech stacks for filter options
   const { data: techStacks, isLoading: techStacksLoading } = useTechStacks()

   // Build tech options with "All" as first option
   const techOptions = ["All", ...techStacks]

   console.log("Developers:", developers)
   console.log("Tech stacks:", techStacks)
   console.log("Meta:", meta)

   return (
      <div className="p-8">
         <h1 className="text-2xl font-bold mb-4">Discover Developers Test</h1>

         <div className="mb-4 flex gap-4">
            <input
               type="text"
               placeholder="Search developers..."
               value={searchQuery}
               onChange={e => setSearchQuery(e.target.value)}
               className="px-4 py-2 border rounded"
            />

            <select
               value={techFilter}
               onChange={e => setTechFilter(e.target.value)}
               className="px-4 py-2 border rounded"
            >
               {techOptions.map(tech => (
                  <option key={tech} value={tech}>
                     {tech}
                  </option>
               ))}
            </select>

            <select
               value={sortBy}
               onChange={e => setSortBy(e.target.value)}
               className="px-4 py-2 border rounded"
            >
               {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                     {option.label}
                  </option>
               ))}
            </select>
         </div>

         {developersError && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700">
               Error: {developersError}
            </div>
         )}

         {isLoading ? (
            <div>Loading...</div>
         ) : (
            <div>
               <p>Total: {meta?.total || 0} developers found</p>
               <div className="grid gap-4">
                  {developers.map((dev: any) => (
                     <div key={dev.id} className="p-4 border rounded">
                        <h3 className="font-bold">{dev.name}</h3>
                        <p>Username: {dev.username}</p>
                        <p>Score: {dev.score}</p>
                        <p>Tech Stack: {dev.techStack.join(", ")}</p>
                     </div>
                  ))}
               </div>
            </div>
         )}
      </div>
   )
}
