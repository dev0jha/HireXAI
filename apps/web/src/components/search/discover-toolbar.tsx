import { cn } from "@/lib/utils"
import { SearchInputGroup } from "./search-input-group"
import { TechFilterSelect } from "./tech-filter-select"
import { SortSelect } from "./sort-select"

interface DiscoverToolbarProps {
   searchValue?: string
   onSearchChange?: (value: string) => void
   onSearch?: () => void
   techFilter?: string
   onTechFilterChange?: (value: string | null) => void
   sortBy?: string
   onSortChange?: (value: string | null) => void
   className?: string
}

export function DiscoverToolbar({
   searchValue,
   onSearchChange,
   onSearch,
   techFilter,
   onTechFilterChange,
   sortBy,
   onSortChange,
   className,
}: DiscoverToolbarProps) {
   return (
      <div className={cn("flex w-full flex-col gap-3 sm:flex-row lg:w-auto", className)}>
         <SearchInputGroup value={searchValue} onChange={onSearchChange} onSearch={onSearch} />
         <TechFilterSelect value={techFilter} onValueChange={onTechFilterChange} />
         <SortSelect value={sortBy} onValueChange={onSortChange} />
      </div>
   )
}
