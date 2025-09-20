"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Target, BookOpen } from "lucide-react"
import type { TestResult, TestAnswer } from "@/types/test"
import Link from "next/link"

interface TestResultsProps {
  result: TestResult
  answers: TestAnswer[]
  showAnswers?: boolean
}

export function TestResults({ result, answers, showAnswers = true }: TestResultsProps) {
  const formatTime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`
  }

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600"
    if (percentage >= 75) return "text-blue-600"
    if (percentage >= 60) return "text-orange-600"
    return "text-red-600"
  }

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return "A+"
    if (percentage >= 85) return "A"
    if (percentage >= 80) return "A-"
    if (percentage >= 75) return "B+"
    if (percentage >= 70) return "B"
    if (percentage >= 65) return "B-"
    if (percentage >= 60) return "C+"
    if (percentage >= 55) return "C"
    if (percentage >= 50) return "C-"
    return "F"
  }

  return (
    <div className="space-y-6">
      {/* Overall Results */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div
              className={`w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold`}
            >
              {getGrade(result.percentage)}
            </div>
          </div>
          <CardTitle className="text-2xl">Test Completed!</CardTitle>
          <CardDescription>Here's how you performed on this assessment</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(result.percentage)}`}>{result.percentage}%</div>
              <p className="text-sm text-muted-foreground">Overall Score</p>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {result.score}/{result.maxScore}
              </div>
              <p className="text-sm text-muted-foreground">Points Earned</p>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-accent">{formatTime(result.timeSpent)}</div>
              <p className="text-sm text-muted-foreground">Time Taken</p>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">{answers.filter((a) => a.isCorrect).length}</div>
              <p className="text-sm text-muted-foreground">Correct Answers</p>
            </div>
          </div>

          <Progress value={result.percentage} className="h-3 mb-4" />

          <div className="text-center">
            <Badge variant={result.percentage >= 70 ? "default" : "destructive"} className="text-sm">
              {result.percentage >= 70 ? "PASSED" : "NEEDS IMPROVEMENT"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Subject Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Subject Performance
          </CardTitle>
          <CardDescription>Your performance across different subject areas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result.subjectBreakdown.map((subject) => (
              <div key={subject.subject} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium capitalize">{subject.subject}</span>
                  <span className={`font-bold ${getScoreColor(subject.percentage)}`}>
                    {subject.percentage}% ({subject.score}/{subject.maxScore})
                  </span>
                </div>
                <Progress value={subject.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Recommendations
            </CardTitle>
            <CardDescription>Personalized suggestions to improve your performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Answer Review */}
      {showAnswers && (
        <Card>
          <CardHeader>
            <CardTitle>Answer Review</CardTitle>
            <CardDescription>Review your answers and see the correct solutions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {answers.map((answer, index) => (
                <div key={answer.questionId} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Question {index + 1}</span>
                    <div className="flex items-center gap-2">
                      {answer.isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                      <Badge variant={answer.isCorrect ? "default" : "destructive"}>
                        {answer.isCorrect ? "Correct" : "Incorrect"}
                      </Badge>
                    </div>
                  </div>

                  <div className="text-sm space-y-1">
                    <p>
                      <strong>Your answer:</strong>{" "}
                      {Array.isArray(answer.answer) ? answer.answer.join(", ") : answer.answer}
                    </p>
                    <p>
                      <strong>Time spent:</strong> {Math.round(answer.timeSpent)}s
                    </p>
                    {answer.attempts > 1 && (
                      <p>
                        <strong>Attempts:</strong> {answer.attempts}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild>
          <Link href="/dashboard/student">Back to Dashboard</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/tests">Take Another Test</Link>
        </Button>
        <Button variant="outline">Share Results</Button>
      </div>
    </div>
  )
}
