"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, AlertCircle } from "lucide-react"
import type { Question } from "@/types/test"

interface QuestionDisplayProps {
  question: Question
  questionNumber: number
  totalQuestions: number
  timeRemaining: number
  onAnswer: (answer: string | string[]) => void
  onNext: () => void
  onPrevious: () => void
  canGoBack: boolean
  isLast: boolean
  currentAnswer?: string | string[]
}

export function QuestionDisplay({
  question,
  questionNumber,
  totalQuestions,
  timeRemaining,
  onAnswer,
  onNext,
  onPrevious,
  canGoBack,
  isLast,
  currentAnswer,
}: QuestionDisplayProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>(currentAnswer || "")
  const [timeLeft, setTimeLeft] = useState(question.timeLimit || 0)

  useEffect(() => {
    setSelectedAnswer(currentAnswer || "")
  }, [currentAnswer])

  useEffect(() => {
    if (question.timeLimit) {
      setTimeLeft(question.timeLimit)
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            handleNext()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [question.id])

  const handleAnswerChange = (answer: string | string[]) => {
    setSelectedAnswer(answer)
    onAnswer(answer)
  }

  const handleNext = () => {
    onNext()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
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

  const renderQuestionInput = () => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <RadioGroup value={selectedAnswer as string} onValueChange={handleAnswerChange} className="space-y-3">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )

      case "true-false":
        return (
          <RadioGroup value={selectedAnswer as string} onValueChange={handleAnswerChange} className="space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="true" />
              <Label htmlFor="true" className="cursor-pointer">
                True
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="false" />
              <Label htmlFor="false" className="cursor-pointer">
                False
              </Label>
            </div>
          </RadioGroup>
        )

      case "fill-blank":
        return (
          <Input
            value={selectedAnswer as string}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full"
          />
        )

      case "essay":
        return (
          <Textarea
            value={selectedAnswer as string}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Write your answer here..."
            className="w-full min-h-32"
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress and Timer */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">
                Question {questionNumber} of {totalQuestions}
              </span>
              <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
              <Badge variant="outline">
                {question.points} {question.points === 1 ? "point" : "points"}
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              {question.timeLimit && (
                <div className={`flex items-center gap-1 ${timeLeft <= 30 ? "text-red-600" : "text-muted-foreground"}`}>
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-mono">{formatTime(timeLeft)}</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-mono">{formatTime(timeRemaining)}</span>
              </div>
            </div>
          </div>

          <Progress value={(questionNumber / totalQuestions) * 100} className="h-2" />
        </CardContent>
      </Card>

      {/* Question */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg leading-relaxed">{question.question}</CardTitle>
          {question.imageUrl && (
            <img
              src={question.imageUrl || "/placeholder.svg"}
              alt="Question illustration"
              className="max-w-full h-auto rounded-lg"
            />
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {renderQuestionInput()}

          {timeLeft <= 30 && question.timeLimit && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm text-red-600">Time running out! {timeLeft} seconds remaining.</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious} disabled={!canGoBack}>
          Previous
        </Button>

        <Button
          onClick={handleNext}
          disabled={!selectedAnswer}
          className={isLast ? "bg-green-600 hover:bg-green-700" : ""}
        >
          {isLast ? "Finish Test" : "Next Question"}
        </Button>
      </div>
    </div>
  )
}
