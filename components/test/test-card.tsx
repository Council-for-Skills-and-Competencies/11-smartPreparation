"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen, Target, Zap } from "lucide-react"
import type { TestTemplate } from "@/types/test"
import Link from "next/link"

interface TestCardProps {
  test: TestTemplate
}

export function TestCard({ test }: TestCardProps) {
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

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case "maths":
        return "bg-blue-100 text-blue-800"
      case "english":
        return "bg-green-100 text-green-800"
      case "reasoning":
        return "bg-purple-100 text-purple-800"
      case "science":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{test.title}</CardTitle>
            <CardDescription className="text-sm">{test.description}</CardDescription>
          </div>
          {test.isAdaptive && (
            <Badge variant="secondary" className="bg-accent/10 text-accent">
              <Zap className="h-3 w-3 mr-1" />
              Adaptive
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          <Badge className={getSubjectColor(test.subject)}>
            {test.subject.charAt(0).toUpperCase() + test.subject.slice(1)}
          </Badge>
          <Badge variant="outline" className={getDifficultyColor(test.difficulty)}>
            {test.difficulty.charAt(0).toUpperCase() + test.difficulty.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{test.duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>{test.totalQuestions} questions</span>
          </div>
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span>{test.passingScore}% to pass</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {test.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Button asChild className="w-full">
          <Link href={`/test/${test.id}`}>Start Test</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
