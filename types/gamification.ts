export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  color: string
  category: "academic" | "streak" | "social" | "milestone"
  rarity: "common" | "rare" | "epic" | "legendary"
  points: number
  requirements: {
    type: "test_score" | "streak_days" | "tests_completed" | "subject_mastery" | "time_spent"
    value: number
    subject?: string
  }[]
  unlockedAt?: Date
  progress?: number
}

export interface LeaderboardEntry {
  id: string
  studentId: string
  studentName: string
  avatar?: string
  points: number
  level: number
  rank: number
  weeklyPoints: number
  monthlyPoints: number
  badges: number
  streak: number
}

export interface Reward {
  id: string
  name: string
  description: string
  icon: string
  type: "badge" | "title" | "avatar" | "theme" | "feature"
  cost: number
  category: string
  isUnlocked: boolean
  isPurchased: boolean
}

export interface StudyStreak {
  currentStreak: number
  longestStreak: number
  lastActivityDate: Date
  streakHistory: {
    date: Date
    testsCompleted: number
    timeSpent: number
  }[]
}

export interface LevelSystem {
  currentLevel: number
  currentXP: number
  xpToNextLevel: number
  totalXP: number
  levelBenefits: {
    level: number
    benefits: string[]
  }[]
}
