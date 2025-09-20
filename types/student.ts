export interface Subject {
  id: string
  name: string
  icon: string
  color: string
}

export interface TestResult {
  id: string
  testId: string
  testName: string
  subject: string
  score: number
  maxScore: number
  percentage: number
  timeSpent: number // in minutes
  completedAt: Date
  difficulty: "easy" | "medium" | "hard"
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  color: string
  unlockedAt?: Date
}

export interface StudentProgress {
  totalTests: number
  averageScore: number
  strongSubjects: string[]
  weakSubjects: string[]
  recentActivity: TestResult[]
  weeklyProgress: {
    week: string
    testsCompleted: number
    averageScore: number
  }[]
}

export interface GamificationData {
  level: number
  currentXP: number
  xpToNextLevel: number
  totalXP: number
  streak: number
  longestStreak: number
  badges: Badge[]
  rank: number
  totalStudents: number
}
