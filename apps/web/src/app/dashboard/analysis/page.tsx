"use client"

import { Results } from "@/components/analysis/analysis-results"
import { ErrorMessage } from "@/components/analysis/analysis-error"
import { AnalysisInputTrigger } from "@/components/analysis/analysis-input"
import DashTitleShell from "@/components/dash-screentitle-text"
import { AnalysisStore } from "@/hooks/scopedstores/analysis.store"

export default function AnalyzePage() {
  return (
    <AnalysisStore.Provider>
      <div className="mx-auto flex-1  py-2 sm:py-8 lg:py-10 mt-4 sm:mt-6">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="gap-1">
            <DashTitleShell
              title="Analyze Repository"
              description="Get AI-powered feedback on your GitHub project"
            />
          </div>

          <AnalysisInputTrigger />

          {/* Error */}
          <ErrorMessage />

          {/* Results */}

          <Results />
        </div>
      </div>
    </AnalysisStore.Provider>
  )
}
