export type QuestionType = "multiple-choice" | "true-false" | "fill-blank" | "essay"
export type Difficulty = "easy" | "medium" | "hard"
export type Subject = "maths" | "english" | "reasoning" | "science"

export interface Question {
  id: string
  type: QuestionType
  subject: Subject
  difficulty: Difficulty
  question: string
  options?: string[] // For multiple choice
  correctAnswer: string | string[] // Can be multiple for fill-blank
  explanation: string
  points: number
  timeLimit?: number // in seconds
  imageUrl?: string
}

export interface TestTemplate {
  id: string
  title: string
  description: string
  subject: Subject
  difficulty: Difficulty
  duration: number // in minutes
  totalQuestions: number
  passingScore: number
  questions: Question[]
  isAdaptive: boolean
  tags: string[]
}

export interface TestSession {
  id: string
  testId: string
  studentId: string
  startTime: Date
  endTime?: Date
  currentQuestionIndex: number
  answers: TestAnswer[]
  score?: number
  percentage?: number
  timeSpent: number
  status: "in-progress" | "completed" | "abandoned"
  adaptiveDifficulty?: Difficulty
}

export interface TestAnswer {
  questionId: string
  answer: string | string[]
  isCorrect: boolean
  timeSpent: number
  attempts: number
}

export interface TestResult {
  sessionId: string
  testId: string
  studentId: string
  score: number
  maxScore: number
  percentage: number
  timeSpent: number
  completedAt: Date
  answers: TestAnswer[]
  subjectBreakdown: {
    subject: Subject
    score: number
    maxScore: number
    percentage: number
  }[]
  recommendations: string[]
}
