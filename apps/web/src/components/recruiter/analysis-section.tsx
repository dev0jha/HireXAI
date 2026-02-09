import { Terminal } from "lucide-react"
import ScorePieChart from "@/components/developer/score-pie-chart"

interface AnalysisSectionProps {
   scores: {
      codeQuality: number
      architecture: number
      security: number
      gitPractices: number
      documentation: number
   }
   totalScore: number
}

export function AnalysisSection({ scores, totalScore }: AnalysisSectionProps) {
   return (
      <div className="h-full flex flex-col rounded-md border-2 border-zinc-800/50 bg-neutral-900/40 p-5 shadow-sm">
         <div className="flex items-center gap-2 mb-6">
            <div className="p-1.5 rounded bg-zinc-800/50 text-zinc-400">
               <Terminal className="h-4 w-4" />
            </div>
            <h2 className="text-sm font-semibold text-zinc-200">Analysis Breakdown</h2>
         </div>

         <div className="flex-1 flex items-center justify-center py-2">
            <ScorePieChart scores={scores} totalScore={totalScore} />
         </div>
      </div>
   )
}
