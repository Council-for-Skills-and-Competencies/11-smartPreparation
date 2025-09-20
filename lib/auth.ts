import type { User, UserRole } from "@/types/auth"

// Mock authentication service - replace with Firebase Auth in production
class AuthService {
  private users: User[] = [
    {
      id: "1",
      email: "student@test.com",
      name: "Alex Johnson",
      role: "student",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      email: "parent@test.com",
      name: "Sarah Johnson",
      role: "parent",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      email: "teacher@test.com",
      name: "Mr. Smith",
      role: "teacher",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  async signIn(email: string, password: string): Promise<User> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = this.users.find((u) => u.email === email)
    if (!user) {
      throw new Error("Invalid credentials")
    }

    return user
  }

  async signUp(email: string, password: string, name: string, role: UserRole): Promise<User> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.users.push(newUser)
    return newUser
  }

  async signOut(): Promise<void> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  async getCurrentUser(): Promise<User | null> {
    // Simulate checking stored session
    const stored = localStorage.getItem("auth-user")
    return stored ? JSON.parse(stored) : null
  }

  async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    const userIndex = this.users.findIndex((u) => u.id === userId)
    if (userIndex === -1) {
      throw new Error("User not found")
    }

    this.users[userIndex] = { ...this.users[userIndex], ...updates, updatedAt: new Date() }
    return this.users[userIndex]
  }
}

export const authService = new AuthService()
