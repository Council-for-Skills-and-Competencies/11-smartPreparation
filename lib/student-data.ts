import type { TestResult, Badge, StudentProgress, GamificationData, Subject } from "@/types/student"

export const subjects: Subject[] = [
  { id: "maths", name: "Mathematics", icon: "🔢", color: "bg-blue-500" },
  { id: "english", name: "English", icon: "📚", color: "bg-green-500" },
  { id: "reasoning", name: "Reasoning", icon: "🧠", color: "bg-purple-500" },
  { id: "science", name: "Science", icon: "🔬", color: "bg-orange-500" },
]

export const mockBadges: Badge[] = [
  {
    id: "1",
    name: "First Steps",
    description: "Complete your first mock test",
    icon: "🎯",
    color: "bg-green-500",
    unlockedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Math Wizard",
    description: "Score 90% or higher in 5 math tests",
    icon: "🧙‍♂️",
    color: "bg-blue-500",
    unlockedAt: new Date("2024-01-20"),
  },
  {
    id: "3",
    name: "Streak Master",
    description: "Maintain a 7-day study streak",
    icon: "🔥",
    color: "bg-red-500",
    unlockedAt: new Date("2024-01-25"),
  },
  {
    id: "4",
    name: "Speed Reader",
    description: "Complete an English test in under 20 minutes",
    icon: "⚡",
    color: "bg-yellow-500",
  },
  {
    id: "5",
    name: "Logic Master",
    description: "Perfect score in 3 reasoning tests",
    icon: "🎓",
    color: "bg-purple-500",
  },
]

export const mockTestResults: TestResult[] = [
  {
    id: "1",
    testId: "math-001",
    testName: "Arithmetic Fundamentals",
    subject: "Mathematics",
    score: 85,
    maxScore: 100,
    percentage: 85,
    timeSpent: 45,
    completedAt: new Date("2024-01-28"),
    difficulty: "medium",
  },
  {
    id: "2",
    testId: "eng-001",
    testName: "Reading Comprehension",
    subject: "English",
    score: 92,
    maxScore: 100,
    percentage: 92,
    timeSpent: 38,
    completedAt: new Date("2024-01-27"),
    difficulty: "medium",
  },
  {
    id: "3",
    testId: "reason-001",
    testName: "Logical Patterns",
    subject: "Reasoning",
    score: 78,
    maxScore: 100,
    percentage: 78,
    timeSpent: 52,
    completedAt: new Date("2024-01-26"),
    difficulty: "hard",
  },
]

export const mockStudentProgress: StudentProgress = {
  totalTests: 15,
  averageScore: 82.5,
  strongSubjects: ["English", "Mathematics"],
  weakSubjects: ["Science"],
  recentActivity: mockTestResults,
  weeklyProgress: [
    { week: "Week 1", testsCompleted: 3, averageScore: 78 },
    { week: "Week 2", testsCompleted: 5, averageScore: 82 },
    { week: "Week 3", testsCompleted: 4, averageScore: 85 },
    { week: "Week 4", testsCompleted: 3, averageScore: 88 },
  ],
}

export const mockGamificationData: GamificationData = {
  level: 8,
  currentXP: 1250,
  xpToNextLevel: 1500,
  totalXP: 2750,
  streak: 12,
  longestStreak: 18,
  badges: mockBadges.filter((b) => b.unlockedAt),
  rank: 23,
  totalStudents: 156,
}
