import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { IconCode, IconExternalLink, IconStar } from "@tabler/icons-react"

export function FeaturedProject({ project }: { project: any }) {
   return (
      <div className="group flex flex-col justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 transition-all hover:border-zinc-700 hover:bg-zinc-900/60 shadow-none">
         {/* Header */}
         <div className="flex items-start justify-between">
            <div className="space-y-1">
               <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-blue-500/10 text-blue-400">
                     <IconCode className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                     Featured Project
                  </span>
               </div>
               <h3 className="text-lg font-semibold text-zinc-100 mt-2">{project.name}</h3>
            </div>
            <Badge
               variant="outline"
               size="sm"
               className="border-zinc-700 bg-zinc-800 text-zinc-300 gap-1.5 px-2 py-1 items-center justify-center"
            >
               <IconStar className="h-3 w-3 fill-yellow-500/20 text-yellow-500" />
               {project.stars}
            </Badge>
         </div>

         {/* Content */}
         <p className="text-sm leading-relaxed text-zinc-400 line-clamp-3">{project.description}</p>

         {/* Footer */}
         <div className="mt-2 flex items-center justify-between border-t border-zinc-800/50 pt-4">
            <div className="flex items-center gap-2">
               <Badge
                  variant="secondary"
                  size="sm"
                  className="rounded-md bg-zinc-800/50 text-zinc-400 border border-zinc-800/50 px-2 py-1 items-center justify-center"
               >
                  {project.language}
               </Badge>
               <Badge
                  variant="secondary"
                  size="sm"
                  className="rounded-md bg-zinc-800/50 text-zinc-400 border border-zinc-800/50 px-2 py-1 items-center justify-center"
               >
                  Score: {project.totalScore}
               </Badge>
            </div>
            <Button
               variant="ghost"
               size="sm"
               className="h-8 text-xs text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
            >
               <Link
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs"
               >
                  View Repository
                  <IconExternalLink className="ml-2 h-3.5 w-3.5" />
               </Link>
            </Button>
         </div>
      </div>
   )
}
