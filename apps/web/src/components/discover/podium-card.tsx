import { Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { Developer } from "@/types"

interface PodiumCardProps {
   developer: Developer
   rank: number
   onContact: () => void
   className?: string
}

export function PodiumCard({ developer, rank, onContact, className }: PodiumCardProps) {
   const isGold = rank === 1
   const isSilver = rank === 2
   const isBronze = rank === 3

   return (
      <div
         className={cn(
            "relative flex flex-col items-center p-5 rounded-lg border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-300",
            className
         )}
      >
         {/* Rank Icon */}
         <div className="absolute top-4 right-4 opacity-80">
            {isGold && <Trophy className="h-4 w-4 text-yellow-500" />}
            {isSilver && <Trophy className="h-4 w-4 text-zinc-400" />}
            {isBronze && <Trophy className="h-4 w-4 text-amber-700" />}
         </div>

         {/* Avatar */}
         <div
            className={cn(
               "p-0.5 rounded-full mb-3 ring-1 ring-offset-2 ring-offset-black/50 shadow-lg",
               isGold
                  ? "bg-yellow-500/10 ring-yellow-500/30"
                  : isSilver
                    ? "bg-zinc-400/10 ring-zinc-400/30"
                    : "bg-amber-700/10 ring-amber-700/30"
            )}
         >
            <Avatar className="h-16 w-16">
               <AvatarImage src={developer.avatar} className="object-cover" />
               <AvatarFallback className="bg-zinc-800 text-zinc-400 font-medium">
                  {developer.name[0]}
               </AvatarFallback>
            </Avatar>
         </div>

         {/* Info */}
         <div className="text-center space-y-0.5 mb-5">
            <h3 className="font-semibold text-base text-zinc-100">{developer.name}</h3>
            <p className="text-xs text-zinc-500">@{developer.username}</p>
         </div>

         {/* Stats */}
         <div className="grid grid-cols-2 gap-px bg-zinc-800/40 w-full rounded-md overflow-hidden mb-5 border border-zinc-800/40">
            <div className="flex flex-col items-center bg-zinc-900/20 py-2.5">
               <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                  Score
               </span>
               <span className="text-lg font-bold text-zinc-200 leading-none mt-1">
                  {developer.score}
               </span>
            </div>
            <div className="flex flex-col items-center bg-zinc-900/20 py-2.5">
               <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                  Role
               </span>
               <span className="text-sm font-medium text-zinc-300 leading-none mt-1.5 truncate max-w-20">
                  {developer.techStack[0]}
               </span>
            </div>
         </div>

         <Button
            size="sm"
            variant="outline"
            onClick={onContact}
            className="w-full h-8 rounded-lg bg-zinc-100 text-xs font-semibold text-zinc-300/80 border-2 border-zinc-600/30 hover:bg-zinc-300 shadow-none p-5"
         >
            Contact
         </Button>
      </div>
   )
}
