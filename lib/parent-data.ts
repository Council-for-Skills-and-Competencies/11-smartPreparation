import type { Child, ChildPerformance, ParentInsights } from "@/types/parent"

export const mockChildren: Child[] = [
  {
    id: "child-1",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    grade: "Year 6",
    targetExamDate: new Date("2024-09-15"),
    subjects: ["maths", "english", "reasoning", "science"],
    parentId: "parent-1",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "child-2",
    name: "Emma Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    grade: "Year 5",
    targetExamDate: new Date("2025-09-15"),
    subjects: ["maths", "english", "reasoning"],
    parentId: "parent-1",
    createdAt: new Date("2024-01-01"),
  },
]

export const mockChildPerformance: ChildPerformance[] = [
  {
    childId: "child-1",
    childName: "Alex Johnson",
    overallAverage: 82.5,
    totalTestsCompleted: 24,
    studyTimeThisWeek: 180, // minutes
    currentStreak: 12,
    subjectPerformance: [
      {
        subject: "maths",
        average: 85,
        testsCompleted: 8,
        lastTestDate: new Date("2024-01-28"),
        trend: "improving",
        weakTopics: ["Fractions", "Decimals"],
        strongTopics: ["Addition", "Subtraction", "Multiplication"],
      },
      {
        subject: "english",
        average: 88,
        testsCompleted: 6,
        lastTestDate: new Date("2024-01-27"),
        trend: "stable",
        weakTopics: ["Grammar"],
        strongTopics: ["Reading Comprehension", "Vocabulary"],
      },
      {
        subject: "reasoning",
        average: 75,
        testsCompleted: 5,
        lastTestDate: new Date("2024-01-26"),
        trend: "declining",
        weakTopics: ["Spatial Reasoning", "Number Sequences"],
        strongTopics: ["Verbal Reasoning"],
      },
      {
        subject: "science",
        average: 82,
        testsCompleted: 5,
        lastTestDate: new Date("2024-01-25"),
        trend: "improving",
        weakTopics: ["Physics"],
        strongTopics: ["Biology", "Chemistry"],
      },
    ],
    recentTests: [
      {
        id: "test-1",
        testName: "Arithmetic Fundamentals",
        subject: "maths",
        score: 85,
        maxScore: 100,
        percentage: 85,
        completedAt: new Date("2024-01-28"),
        timeSpent: 45,
      },
      {
        id: "test-2",
        testName: "Reading Comprehension",
        subject: "english",
        score: 92,
        maxScore: 100,
        percentage: 92,
        completedAt: new Date("2024-01-27"),
        timeSpent: 38,
      },
      {
        id: "test-3",
        testName: "Logical Patterns",
        subject: "reasoning",
        score: 78,
        maxScore: 100,
        percentage: 78,
        completedAt: new Date("2024-01-26"),
        timeSpent: 52,
      },
    ],
    weeklyProgress: [
      { week: "Week 1", testsCompleted: 3, averageScore: 78, studyTime: 120 },
      { week: "Week 2", testsCompleted: 5, averageScore: 82, studyTime: 150 },
      { week: "Week 3", testsCompleted: 4, averageScore: 85, studyTime: 180 },
      { week: "Week 4", testsCompleted: 3, averageScore: 88, studyTime: 160 },
    ],
    attendance: [
      {
        date: new Date("2024-01-28"),
        studyTime: 45,
        testsCompleted: 2,
        subjects: ["maths", "english"],
      },
      {
        date: new Date("2024-01-27"),
        studyTime: 60,
        testsCompleted: 1,
        subjects: ["english"],
      },
      {
        date: new Date("2024-01-26"),
        studyTime: 30,
        testsCompleted: 1,
        subjects: ["reasoning"],
      },
    ],
  },
]

export const mockParentInsights: ParentInsights[] = [
  {
    childId: "child-1",
    recommendations: [
      {
        type: "subject_focus",
        title: "Focus on Reasoning Skills",
        description:
          "Alex's reasoning scores have declined recently. Additional practice in spatial reasoning and number sequences would be beneficial.",
        priority: "high",
        actionItems: [
          "Schedule 20 minutes daily for reasoning practice",
          "Use visual aids for spatial reasoning problems",
          "Practice number sequence patterns regularly",
        ],
      },
      {
        type: "study_schedule",
        title: "Maintain Consistent Study Schedule",
        description:
          "Alex has been maintaining a good study streak. Continue with the current schedule to build momentum.",
        priority: "medium",
        actionItems: [
          "Keep the current 30-minute daily study sessions",
          "Reward consistency with small incentives",
          "Track progress visually with a calendar",
        ],
      },
      {
        type: "exam_prep",
        title: "Exam Preparation Strategy",
        description: "With 8 months until the exam, it's time to create a structured preparation plan.",
        priority: "medium",
        actionItems: [
          "Create a monthly study plan",
          "Schedule regular mock exams",
          "Identify and book exam centers early",
        ],
      },
    ],
    alerts: [
      {
        type: "performance_drop",
        message: "Reasoning scores have dropped by 10% in the last two weeks",
        severity: "warning",
        date: new Date("2024-01-26"),
      },
      {
        type: "exam_approaching",
        message: "11+ exam is in 8 months - time to intensify preparation",
        severity: "info",
        date: new Date("2024-01-20"),
      },
    ],
    milestones: [
      {
        title: "First Perfect Score",
        description: "Alex achieved 100% in English Reading Comprehension",
        achievedAt: new Date("2024-01-15"),
        category: "academic",
      },
      {
        title: "Two Week Streak",
        description: "Maintained consistent daily study for 14 days",
        achievedAt: new Date("2024-01-20"),
        category: "consistency",
      },
      {
        title: "Math Improvement",
        description: "Math average improved from 75% to 85% this month",
        achievedAt: new Date("2024-01-25"),
        category: "improvement",
      },
    ],
  },
]
