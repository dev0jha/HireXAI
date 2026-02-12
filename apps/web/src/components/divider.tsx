import { cn } from "@/lib/utils"

export function Divider({ className }: { className?: string }) {
   return (
      <div className={cn("relative w-full py-6 border-none", className)}>
         <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t border-dashed border-neutral-700/60" />
      </div>
   )
}
