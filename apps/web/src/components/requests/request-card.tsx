import { Building2, Clock, Mail, X } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ContactRequest } from "@/lib/queries/queryOptions"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function RequestCard({
   request,
   onUpdateStatus,
}: {
   request: ContactRequest
   onUpdateStatus: (requestId: string, status: "accepted" | "rejected") => void
}) {
   const isPending = request.status === "pending"

   return (
      <Card className="group relative flex flex-col justify-between gap-3 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 transition-all hover:border-zinc-700 hover:bg-zinc-900/80 hover:shadow-md">
         {/* Top Row: User Info & Date */}
         <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
               <Avatar className="h-9 w-9 shrink-0 border border-zinc-800">
                  <AvatarImage
                     src="/recruiter-portrait-male-professional.jpg"
                     alt={request.recruiterName || "Recruiter"}
                     className="object-cover"
                  />
                  <AvatarFallback className="bg-zinc-800 text-xs font-medium text-zinc-400">
                     {request.recruiterName
                        ?.split(" ")
                        .map(n => n[0])
                        .join("") || "R"}
                  </AvatarFallback>
               </Avatar>

               <div className="flex flex-col">
                  <h3 className="text-sm font-semibold text-zinc-100">
                     {request.recruiterName || "Unknown Recruiter"}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-zinc-500">
                     <Building2 className="h-3 w-3 shrink-0" />
                     <span className="max-w-30 truncate">
                        {request.recruiterCompany || "Unknown Company"}
                     </span>
                  </div>
               </div>
            </div>

            {/* Date - Pushed to top right */}
            <div className="flex shrink-0 items-center gap-1 text-[10px] font-medium text-zinc-600 uppercase tracking-wide">
               <Clock className="h-3 w-3" />
               <span>
                  {new Date(request.createdAt).toLocaleDateString("en-US", {
                     month: "short",
                     day: "numeric",
                  })}
               </span>
            </div>
         </div>

         {/* Middle: Message */}
         <div className="min-h-12">
            <TooltipProvider>
               <Tooltip>
                  <TooltipTrigger>
                     <p className="line-clamp-2 text-xs leading-relaxed text-zinc-400 cursor-default">
                        {request.message}
                     </p>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs bg-zinc-950 border-zinc-800 text-zinc-300">
                     <p>{request.message}</p>
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>
         </div>

         {/* Bottom: Contact Info (if accepted) OR Actions (if pending) */}
         <div className="mt-1 flex items-center justify-between pt-2 border-t border-zinc-800/50">
            {/* Status Badge */}
            {!isPending && (
               <Badge
                  variant="outline"
                  className={cn(
                     "h-6 px-2 text-[10px] uppercase tracking-wider",
                     getBadgeStyle(request.status)
                  )}
               >
                  {request.status}
               </Badge>
            )}

            {/* Content based on status */}
            {request.status === "accepted" && request.recruiterEmail ? (
               <div className="flex items-center gap-2 overflow-hidden rounded bg-emerald-950/20 px-2 py-1.5 ml-auto w-auto max-w-full">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                  <span className="truncate text-xs font-medium text-emerald-200/90 selection:bg-emerald-500/30">
                     {request.recruiterEmail}
                  </span>
               </div>
            ) : request.status === "rejected" ? (
               <span className="text-xs text-zinc-600 italic ml-auto">Request declined</span>
            ) : (
               <div className="flex w-full items-center justify-between gap-2">
                  <Badge
                     variant="outline"
                     className="border-zinc-800 bg-zinc-900 text-zinc-500 hover:bg-zinc-900"
                  >
                     Pending
                  </Badge>
                  <div className="flex gap-2">
                     <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onUpdateStatus(request.id, "rejected")}
                        className="h-7 w-7 rounded-full p-0 text-zinc-500 hover:bg-red-500/10 hover:text-red-400"
                     >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Decline</span>
                     </Button>
                     <Button
                        size="sm"
                        onClick={() => onUpdateStatus(request.id, "accepted")}
                        className="h-7 rounded-full bg-zinc-100 px-3 text-xs font-semibold text-zinc-950 hover:bg-zinc-300"
                     >
                        Accept
                     </Button>
                  </div>
               </div>
            )}
         </div>
      </Card>
   )
}

const getBadgeStyle = (status: string) => {
   switch (status) {
      case "accepted":
         return "bg-emerald-500/5 text-emerald-500 border-emerald-500/20"
      case "rejected":
         return "bg-red-500/5 text-red-500 border-red-500/20"
      default:
         return "bg-zinc-800 text-zinc-400 border-zinc-700"
   }
}
