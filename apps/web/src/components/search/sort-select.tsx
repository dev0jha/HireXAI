import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface SortOption {
   value: string
   label: string
}

interface SortSelectProps {
   value?: string
   onValueChange?: (value: string | null) => void
   options?: SortOption[]
   className?: string
   triggerClassName?: string
}

export function SortSelect({
   value,
   onValueChange,
   options = [
      { value: "score-desc", label: "Score (High to Low)" },
      { value: "score-asc", label: "Score (Low to High)" },
      { value: "name-asc", label: "Name (A to Z)" },
   ],
   className,
   triggerClassName,
}: SortSelectProps) {
   return (
      <Select value={value} onValueChange={onValueChange}>
         <SelectTrigger
            className={cn(
               "h-9 w-full sm:w-40 rounded-md border-zinc-800 bg-zinc-900/50 text-sm text-zinc-300 focus:ring-zinc-700",
               triggerClassName
            )}
         >
            <SelectValue aria-placeholder="Sort by" />
         </SelectTrigger>
         <SelectContent className="border-2 border-zinc-800 bg-zinc-800 text-zinc-300 rounded-lg px-2">
            {options.map(option => (
               <SelectItem
                  key={option.value}
                  value={option.value}
                  className="focus:bg-zinc-900 focus:text-zinc-100"
               >
                  {option.label}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   )
}
