"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { QuestionDisplay } from "@/components/test/question-display"
import { TestResults } from "@/components/test/test-results"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { testTemplates } from "@/lib/test-data"
import type { TestSession, TestAnswer, TestResult } from "@/types/test"
import { Clock, BookOpen, Target, Play } from "lucide-react"

interface TestPageProps {
  params: {
    testId: string
  }
}

export default function TestPage({ params }: TestPageProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [test, setTest] = useState(testTemplates.find((t) => t.id === params.testId))
  const [session, setSession] = useState<TestSession | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<TestAnswer[]>([])
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [testResult, setTestResult] = useState<TestResult | null>(null)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (test && hasStarted) {
      setTimeRemaining(test.duration * 60) // Convert minutes to seconds

      // Initialize session
      const newSession: TestSession = {
        id: Date.now().toString(),
        testId: test.id,
        studentId: user?.id || "",
        startTime: new Date(),
        currentQuestionIndex: 0,
        answers: [],
        timeSpent: 0,
        status: "in-progress",
      }
      setSession(newSession)

      // Initialize answers array
      setAnswers(
        test.questions.map((q) => ({
          questionId: q.id,
          answer: "",
          isCorrect: false,
          timeSpent: 0,
          attempts: 0,
        })),
      )
    }
  }, [test, hasStarted, user])

  useEffect(() => {
    if (hasStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            handleFinishTest()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [hasStarted, timeRemaining])

  const handleStartTest = () => {
    setHasStarted(true)
  }

  const handleAnswer = (answer: string | string[]) => {
    const updatedAnswers = [...answers]
    updatedAnswers[currentQuestionIndex] = {
      ...updatedAnswers[currentQuestionIndex],
      answer,
      attempts: updatedAnswers[currentQuestionIndex].attempts + 1,
    }
    setAnswers(updatedAnswers)
  }

  const handleNext = () => {
    if (currentQuestionIndex < (test?.questions.length || 0) - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      handleFinishTest()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const calculateScore = () => {
    if (!test) return { score: 0, maxScore: 0, percentage: 0 }

    let score = 0
    const maxScore = test.questions.reduce((sum, q) => sum + q.points, 0)

    const gradedAnswers = answers.map((answer, index) => {
      const question = test.questions[index]
      const isCorrect = Array.isArray(question.correctAnswer)
        ? Array.isArray(answer.answer) &&
          question.correctAnswer.every((ca) => answer.answer.includes(ca)) &&
          answer.answer.length === question.correctAnswer.length
        : answer.answer === question.correctAnswer

      if (isCorrect) {
        score += question.points
      }

      return { ...answer, isCorrect }
    })

    return {
      score,
      maxScore,
      percentage: Math.round((score / maxScore) * 100),
      gradedAnswers,
    }
  }

  const handleFinishTest = () => {
    if (!test || !session) return

    const { score, maxScore, percentage, gradedAnswers } = calculateScore()
    const timeSpent = test.duration - Math.floor(timeRemaining / 60)

    // Calculate subject breakdown
    const subjectBreakdown = test.questions.reduce((acc, question, index) => {
      const existing = acc.find((s) => s.subject === question.subject)
      const isCorrect = gradedAnswers[index].isCorrect

      if (existing) {
        existing.maxScore += question.points
        if (isCorrect) existing.score += question.points
      } else {
        acc.push({
          subject: question.subject,
          score: isCorrect ? question.points : 0,
          maxScore: question.points,
          percentage: 0,
        })
      }
      return acc
    }, [] as any[])

    // Calculate percentages for subjects
    subjectBreakdown.forEach((subject) => {
      subject.percentage = Math.round((subject.score / subject.maxScore) * 100)
    })

    // Generate recommendations
    const recommendations = []
    if (percentage < 70) {
      recommendations.push("Consider reviewing the fundamental concepts before retaking the test")
    }
    subjectBreakdown.forEach((subject) => {
      if (subject.percentage < 60) {
        recommendations.push(`Focus more practice on ${subject.subject} - current performance is below average`)
      }
    })
    if (timeSpent < test.duration * 0.5) {
      recommendations.push("Take more time to carefully read and analyze each question")
    }

    const result: TestResult = {
      sessionId: session.id,
      testId: test.id,
      studentId: user?.id || "",
      score,
      maxScore,
      percentage,
      timeSpent,
      completedAt: new Date(),
      answers: gradedAnswers,
      subjectBreakdown,
      recommendations,
    }

    setTestResult(result)
    setAnswers(gradedAnswers)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading test...</p>
        </div>
      </div>
    )
  }

  if (!user || !test) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-2">Test Not Found</h2>
            <p className="text-muted-foreground mb-4">The requested test could not be found.</p>
            <Button onClick={() => router.push("/tests")}>Back to Tests</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show results if test is completed
  if (testResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 py-6">
          <TestResults result={testResult} answers={answers} />
        </div>
      </div>
    )
  }

  // Show test intro if not started
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
        <Card className="max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{test.title}</CardTitle>
            <CardDescription className="text-lg">{test.description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="font-bold">{test.duration} minutes</div>
                <div className="text-sm text-muted-foreground">Duration</div>
              </div>

              <div className="text-center">
                <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="font-bold">{test.totalQuestions} questions</div>
                <div className="text-sm text-muted-foreground">Total Questions</div>
              </div>

              <div className="text-center">
                <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="font-bold">{test.passingScore}%</div>
                <div className="text-sm text-muted-foreground">Passing Score</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="outline" className="capitalize">
                {test.subject}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {test.difficulty}
              </Badge>
              {test.isAdaptive && <Badge variant="secondary">Adaptive</Badge>}
            </div>

            <div className="text-center">
              <Button size="lg" onClick={handleStartTest} className="px-8">
                <Play className="h-5 w-5 mr-2" />
                Start Test
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show test questions
  const currentQuestion = test.questions[currentQuestionIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-6">
        <QuestionDisplay
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={test.questions.length}
          timeRemaining={timeRemaining}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrevious={handlePrevious}
          canGoBack={currentQuestionIndex > 0}
          isLast={currentQuestionIndex === test.questions.length - 1}
          currentAnswer={answers[currentQuestionIndex]?.answer}
        />
      </div>
    </div>
  )
}
