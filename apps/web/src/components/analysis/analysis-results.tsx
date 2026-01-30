import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import AnalysisCanvas from "@/components/analysis/analysis-canvas"
import {
  IconCode,
  IconFileText,
  IconGitBranch,
  IconLayersOff,
  IconShield,
  IconCheck,
} from "@tabler/icons-react"

import { DashboardCard } from "@/components/layout/dashboard-card"
import { useAnalysisState } from "@/hooks/screens/analysis.hooks"

const scoreCategories = [
  { name: "Code Quality", icon: IconCode, weight: "30%" },
  { name: "Architecture", icon: IconLayersOff, weight: "20%" },
  { name: "Security", icon: IconShield, weight: "20%" },
  { name: "Git Practices", icon: IconGitBranch, weight: "15%" },
  { name: "Documentation", icon: IconFileText, weight: "15%" },
]

export function Results() {
  const { state, isComplete, scoreValues } = useAnalysisState()

  return (
    <>
      {isComplete && state.status === "complete" && (
        <DashboardCard className="p-0 overflow-hidden border">
          <div className="p-6 border-b border-white/5 bg-white/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">{state.result.name}</h2>
                <p className="text-sm text-white/50 font-mono mt-1">{state.result.url}</p>
              </div>

              <div className="flex items-center gap-6 bg-black/20 p-4 rounded-xl border border-white/5">
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">
                    Language
                  </p>
                  <p className="text-sm font-semibold">{state.result.language}</p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Stars</p>
                  <p className="text-sm font-semibold">{state.result.stars}</p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">
                    Total Score
                  </p>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-xl font-bold text-white">{state.result.totalScore}</span>
                    <span className="text-[10px] text-white/40">/100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 divide-x divide-y lg:divide-y-0 divide-white/5">
            <div className="lg:col-span-2 flex flex-col">
              <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <IconGitBranch className="h-4 w-4 text-white/60" />
                  Analysis Flow
                </h3>
              </div>
              <div className="flex-1 min-h-[500px] relative bg-black/40">
                <AnalysisCanvas analysisResult={state.result} />
              </div>
            </div>

            <div className="flex flex-col bg-black/20">
              <div className="p-4 border-b border-white/5 bg-white/5">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <IconCode className="h-4 w-4 text-white/60" />
                  Score Breakdown
                </h3>
              </div>
              <div className="p-6 space-y-6">
                {scoreCategories.map((category, index) => (
                  <div key={category.name} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <category.icon className="h-4 w-4 text-white/40" />
                        <span className="text-xs uppercase tracking-wider text-white/60">
                          {category.name}
                        </span>
                      </div>
                      <span className="text-sm font-mono font-bold">{scoreValues[index]}%</span>
                    </div>
                    <Progress value={scoreValues[index]} className="h-1.5 bg-white/5" />
                  </div>
                ))}
              </div>

              <div className="mt-auto p-4 border-t border-white/5 bg-white/5">
                <h3 className="text-sm font-medium flex items-center gap-2 mb-4">
                  <IconFileText className="h-4 w-4 text-white/60" />
                  AI Feedback
                </h3>
                <div className="space-y-3">
                  {state.result.feedback.slice(0, 3).map((item: string, index: number) => (
                    <div key={index} className="flex gap-3 text-xs leading-relaxed text-white/70">
                      <div className="mt-1 shrink-0">
                        {index < 2 ? (
                          <div className="size-1.5 rounded-full bg-emerald-500" />
                        ) : (
                          <div className="size-1.5 rounded-full bg-amber-500" />
                        )}
                      </div>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DashboardCard>
      )}
    </>
  )
}
