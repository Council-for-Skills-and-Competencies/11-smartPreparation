export type UserRole = "student" | "parent" | "teacher" | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface Student extends User {
  role: "student"
  parentId?: string
  grade: string
  targetExamDate?: Date
  subjects: string[]
  gamificationData: {
    points: number
    level: number
    badges: string[]
    streak: number
    lastActivity: Date
  }
}

export interface Parent extends User {
  role: "parent"
  children: string[] // Student IDs
}

export interface Teacher extends User {
  role: "teacher"
  subjects: string[]
  students: string[] // Student IDs
}

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}
