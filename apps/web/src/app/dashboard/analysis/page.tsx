"use client"

import { useAnalysis } from "@/hooks/screens/analysis.hook"
import { Results } from "@/components/analysis/analysis-results"
import { ErrorMessage } from "@/components/analysis/analysis-error"
import { AnalysisInputTrigger } from "@/components/analysis/analysis-input"
import DashTitleShell from "@/components/dash-screentitle-text"

export default function AnalyzePage() {
  const {
    state,
    repoUrl,
    setRepoUrl,
    handleAnalyze,
    scoreValues,
    isError,
    isComplete,
    isAnalyzing,
  } = useAnalysis()

  return (
    <div className="mx-auto flex-1  py-2 sm:py-8 lg:py-10 mt-4 sm:mt-6">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="gap-1">
          <DashTitleShell
            title="Analyze Repository"
            description="Get AI-powered feedback on your GitHub project"
          />
        </div>

        <AnalysisInputTrigger
          repoUrl={repoUrl}
          state={state}
          setRepoUrl={setRepoUrl}
          isAnalyzing={isAnalyzing}
          handleAnalyze={handleAnalyze}
        />

        {/* Error */}
        <ErrorMessage isError={isError} state={state} />
        {/* Results */}
        <Results state={state} isComplete={isComplete} scoreValues={scoreValues} />
      </div>
    </div>
  )
}
