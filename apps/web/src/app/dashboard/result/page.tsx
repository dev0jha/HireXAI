import { Card } from "@/components/ui/card"
import { mockAnalysisResult } from "@/data/mock-data"
import ScorePieChart from "@/components/developer/score-pie-chart"


export default function ResultsPage() {
  const result = mockAnalysisResult

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 mt-4 sm:mt-6">
      <div className="space-y-8">
        <div className="mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Analysis Results</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Detailed breakdown of your repository analysis
            </p>
          </div>
        </div>

      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">{result.name}</h2>
          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            {result.url} 
          </a>
        </div>

        <div className="flex justify-center mb-6">
          <ScorePieChart scores={result.scores} totalScore={result.totalScore} />
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-4">AI Feedback</h3>
          <ul className="space-y-2">
            {result.feedback.map((item, index) => (
              <li key={index} className="text-sm text-muted-foreground pl-4 border-l-2 border-primary">
                {item}
              </li>
            ))}
          </ul>
        </div>
        </Card>
      </div>
    </div>
  )
}
