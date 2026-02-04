import { IconSearch } from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group"

interface SearchInputGroupProps {
   placeholder?: string
   value?: string
   onChange?: (value: string) => void
   onSearch?: () => void
   className?: string
   inputClassName?: string
   buttonClassName?: string
}

export const SearchInputGroup = ({
   ref,
   placeholder,
   value,
   onChange,
   onSearch,
   className,
   inputClassName,
}: SearchInputGroupProps & React.RefAttributes<HTMLDivElement>) => {
   /*
    * Keydown handler to trigger search on Enter key press
    * **/
   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
         onSearch?.()
      }
   }

   return (
      <InputGroup
         ref={ref}
         className={cn("relative w-full sm:w-48 h-9 border-2 rounded-md py-2", className)}
      >
         <Input
            placeholder={placeholder}
            value={value}
            onChange={e => onChange?.(e.target.value)}
            onKeyDown={handleKeyDown}
            className={cn("p-0 flex-1", inputClassName)}
         />
         <InputGroupAddon>
            <IconSearch className="text-zinc-300" />
         </InputGroupAddon>
      </InputGroup>
   )
}

SearchInputGroup.displayName = "SearchInputGroup"
