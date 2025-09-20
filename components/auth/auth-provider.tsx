"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@/types/auth"
import { authService } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string, role: "student" | "parent" | "teacher") => Promise<void>
  signOut: () => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check for existing session on mount
    authService
      .getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      const user = await authService.signIn(email, password)
      setUser(user)
      localStorage.setItem("auth-user", JSON.stringify(user))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, name: string, role: "student" | "parent" | "teacher") => {
    try {
      setLoading(true)
      setError(null)
      const user = await authService.signUp(email, password, name, role)
      setUser(user)
      localStorage.setItem("auth-user", JSON.stringify(user))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      await authService.signOut()
      setUser(null)
      localStorage.removeItem("auth-user")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign out failed")
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => setError(null)

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signIn,
        signUp,
        signOut,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
