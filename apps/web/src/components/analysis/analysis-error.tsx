import { Card } from "@/components/ui/card"
import { useAnalysisState } from "@/hooks/screens/analysis.hooks"

export function ErrorMessage() {
  const { isError, state } = useAnalysisState()

  return (
    <>
      {isError && (
        <Card className="p-6 border-destructive/50 bg-destructive/5">
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 rounded-full border-2 border-destructive flex items-center justify-center">
              <span className="text-destructive text-xs">!</span>
            </div>
            <p className="text-sm text-destructive">
              {state.status === "error" ? state.error : ""}
            </p>
          </div>
        </Card>
      )}
    </>
  )
}
