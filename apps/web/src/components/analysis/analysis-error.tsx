"use client"

import { IconAlertTriangle } from "@tabler/icons-react"
import { useAnalysisState } from "@/hooks/screens/analysis.hooks"

export function ErrorMessage() {
   const { isError, state } = useAnalysisState()

   if (!isError) return null

   return (
      <div className="animate-in slide-in-from-top-2 fade-in mx-auto flex w-full max-w-lg items-center gap-3 rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 sm:px-4 py-3 text-rose-200 backdrop-blur-sm">
         <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-500/20">
            <IconAlertTriangle className="h-4 w-4 text-rose-500" />
         </div>
         <div className="flex-1 text-xs sm:text-sm">
            <p className="font-semibold text-rose-400">Analysis Failed</p>
            <p className="text-rose-300/80">
               {state.status === "error" ? state.error : "Unknown error occurred"}
            </p>
         </div>
      </div>
   )
}
