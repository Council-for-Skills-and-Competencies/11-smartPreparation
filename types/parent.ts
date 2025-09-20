export interface Child {
  id: string
  name: string
  avatar?: string
  grade: string
  targetExamDate: Date
  subjects: string[]
  parentId: string
  createdAt: Date
}

export interface ChildPerformance {
  childId: string
  childName: string
  overallAverage: number
  totalTestsCompleted: number
  studyTimeThisWeek: number
  currentStreak: number
  subjectPerformance: {
    subject: string
    average: number
    testsCompleted: number
    lastTestDate: Date
    trend: "improving" | "declining" | "stable"
    weakTopics: string[]
    strongTopics: string[]
  }[]
  recentTests: {
    id: string
    testName: string
    subject: string
    score: number
    maxScore: number
    percentage: number
    completedAt: Date
    timeSpent: number
  }[]
  weeklyProgress: {
    week: string
    testsCompleted: number
    averageScore: number
    studyTime: number
  }[]
  attendance: {
    date: Date
    studyTime: number
    testsCompleted: number
    subjects: string[]
  }[]
}

export interface ParentInsights {
  childId: string
  recommendations: {
    type: "study_schedule" | "subject_focus" | "motivation" | "exam_prep"
    title: string
    description: string
    priority: "high" | "medium" | "low"
    actionItems: string[]
  }[]
  alerts: {
    type: "performance_drop" | "missed_study" | "streak_broken" | "exam_approaching"
    message: string
    severity: "info" | "warning" | "error"
    date: Date
  }[]
  milestones: {
    title: string
    description: string
    achievedAt: Date
    category: "academic" | "consistency" | "improvement"
  }[]
}
