export interface TeacherStudent {
  id: string
  name: string
  email: string
  avatar?: string
  grade: string
  enrolledDate: Date
  lastActive: Date
  overallAverage: number
  testsCompleted: number
  currentStreak: number
  subjects: string[]
  status: "active" | "inactive" | "needs_attention"
}

export interface StudentProgress {
  studentId: string
  studentName: string
  recentTests: {
    testId: string
    testName: string
    subject: string
    score: number
    maxScore: number
    percentage: number
    completedAt: Date
    timeSpent: number
  }[]
  subjectPerformance: {
    subject: string
    average: number
    testsCompleted: number
    trend: "improving" | "declining" | "stable"
    lastTestDate: Date
  }[]
  weeklyActivity: {
    week: string
    testsCompleted: number
    averageScore: number
    studyTime: number
  }[]
}

export interface ClassAnalytics {
  totalStudents: number
  activeStudents: number
  averageClassScore: number
  totalTestsCompleted: number
  subjectPerformance: {
    subject: string
    averageScore: number
    studentsCount: number
    testsCompleted: number
  }[]
  topPerformers: {
    studentId: string
    studentName: string
    score: number
  }[]
  needsAttention: {
    studentId: string
    studentName: string
    reason: string
    priority: "high" | "medium" | "low"
  }[]
}

export interface TestCreation {
  id?: string
  title: string
  description: string
  subject: string
  difficulty: "easy" | "medium" | "hard"
  duration: number
  totalQuestions: number
  passingScore: number
  isAdaptive: boolean
  tags: string[]
  questions: {
    id?: string
    type: "multiple-choice" | "true-false" | "fill-blank" | "essay"
    question: string
    options?: string[]
    correctAnswer: string | string[]
    explanation: string
    points: number
    timeLimit?: number
  }[]
  assignedTo: string[]
  dueDate?: Date
  status: "draft" | "published" | "archived"
}
