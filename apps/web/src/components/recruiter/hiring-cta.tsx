import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { IconArrowRight, IconBriefcase } from "@tabler/icons-react"

interface HiringCTAProps {
   isOpen: boolean
   score: number
   firstName: string
}

export function HiringCallToAction({ isOpen, score, firstName }: HiringCTAProps) {
   if (!isOpen || score < 80) return null

   return (
      <Card className="flex flex-col gap-4 rounded-md border-2 border-dashed border-zinc-700/80 bg-zinc-900/30 p-5 sm:flex-row sm:items-center sm:justify-between shadow-none">
         <div className="space-y-1.5">
            <div className="flex items-center gap-2">
               <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10">
                  <IconBriefcase className="h-3 w-3 text-emerald-500" />
               </div>
               <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                  Hiring Opportunity
               </span>
            </div>

            <h3 className="text-sm font-medium text-zinc-200">Interested in hiring {firstName}?</h3>

            <p className="max-w-md text-xs leading-relaxed text-zinc-500">
               This developer is open to new roles. Connect now to discuss opportunities.
            </p>
         </div>

         <Button
            size="sm"
            className="shrink-0 bg-zinc-100 text-zinc-950 hover:bg-zinc-300 font-medium transition-all"
         >
            <Link href="/login" className="flex items-center gap-2">
               Contact Developer
               <IconArrowRight className="h-3.5 w-3.5 opacity-50" />
            </Link>
         </Button>
      </Card>
   )
}
