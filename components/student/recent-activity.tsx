"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import type { TestResult } from "@/types/student"
import { formatDistanceToNow } from "date-fns"

interface RecentActivityProps {
  results: TestResult[]
}

export function RecentActivity({ results }: RecentActivityProps) {
  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 bg-green-100"
    if (percentage >= 75) return "text-blue-600 bg-blue-100"
    if (percentage >= 60) return "text-orange-600 bg-orange-100"
    return "text-red-600 bg-red-100"
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
        <CardDescription>Your latest test results and performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {results.map((result) => (
            <div
              key={result.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">{result.testName}</h4>
                  <Badge variant="outline" className={getDifficultyColor(result.difficulty)}>
                    {result.difficulty}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{result.subject}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(result.completedAt, { addSuffix: true })} • {result.timeSpent} min
                </p>
              </div>

              <div className="text-right">
                <div className={`text-lg font-bold ${getScoreColor(result.percentage).split(" ")[0]}`}>
                  {result.percentage}%
                </div>
                <div className="text-sm text-muted-foreground">
                  {result.score}/{result.maxScore}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
