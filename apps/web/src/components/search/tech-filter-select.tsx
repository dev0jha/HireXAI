import { Filter } from "lucide-react"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface TechFilterSelectProps {
   value?: string
   onValueChange?: (value: string | null) => void
   options?: string[]
   className?: string
   triggerClassName?: string
}

export function TechFilterSelect({
   value,
   onValueChange,
   options = ["All", "React", "TypeScript", "Node.js", "Python", "Go", "AWS", "Docker"],
   className,
   triggerClassName,
}: TechFilterSelectProps) {
   return (
      <Select value={value} onValueChange={onValueChange}>
         <SelectTrigger
            className={cn(
               "h-9 w-full sm:w-40 rounded-md border-zinc-800 bg-zinc-900/50 text-sm text-zinc-300 focus:ring-zinc-700",
               triggerClassName
            )}
         >
            <div className="flex items-center gap-2">
               <Filter className="h-3.5 w-3.5 text-zinc-500" />
               <SelectValue aria-placeholder="Tech Stack" />
            </div>
         </SelectTrigger>
         <SelectContent className="border-2 border-zinc-800 bg-zinc-800 text-zinc-300 rounded-lg px-2">
            {options.map(tech => (
               <SelectItem
                  key={tech}
                  value={tech}
                  className="focus:bg-zinc-900 focus:text-zinc-100"
               >
                  {tech === "All" ? "All Tech" : tech}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   )
}
