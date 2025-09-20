"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame, Target, TrendingUp } from "lucide-react"
import type { StudyStreak } from "@/types/gamification"

interface StreakTrackerProps {
  streak: StudyStreak
}

export function StreakTracker({ streak }: StreakTrackerProps) {
  const getStreakColor = (days: number) => {
    if (days >= 30) return "text-purple-600"
    if (days >= 14) return "text-red-600"
    if (days >= 7) return "text-orange-600"
    if (days >= 3) return "text-yellow-600"
    return "text-gray-600"
  }

  const getStreakBadge = (days: number) => {
    if (days >= 30) return { text: "Legendary", color: "bg-purple-100 text-purple-800" }
    if (days >= 14) return { text: "Epic", color: "bg-red-100 text-red-800" }
    if (days >= 7) return { text: "Great", color: "bg-orange-100 text-orange-800" }
    if (days >= 3) return { text: "Good", color: "bg-yellow-100 text-yellow-800" }
    return { text: "Starting", color: "bg-gray-100 text-gray-800" }
  }

  const streakBadge = getStreakBadge(streak.currentStreak)

  // Create calendar data for streak visualization
  const today = new Date()
  const streakDates = streak.streakHistory.map((entry) => entry.date)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Streak Stats */}
      <Card className="bg-gradient-to-br from-red-50 to-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-red-500" />
            Study Streak
          </CardTitle>
          <CardDescription>Keep your momentum going with daily practice</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getStreakColor(streak.currentStreak)} mb-2`}>
                {streak.currentStreak}
              </div>
              <div className="text-sm text-muted-foreground mb-3">
                {streak.currentStreak === 1 ? "day" : "days"} in a row
              </div>
              <Badge className={streakBadge.color}>{streakBadge.text} Streak</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Best Streak</span>
                </div>
                <div className="text-2xl font-bold text-primary">{streak.longestStreak}</div>
                <div className="text-xs text-muted-foreground">days</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">This Week</span>
                </div>
                <div className="text-2xl font-bold text-accent">{streak.streakHistory.length}</div>
                <div className="text-xs text-muted-foreground">active days</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your study sessions from the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {streak.streakHistory.slice(0, 5).map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <div className="font-medium">
                    {entry.date.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {entry.testsCompleted} {entry.testsCompleted === 1 ? "test" : "tests"} completed
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-primary">{entry.timeSpent}m</div>
                  <div className="text-xs text-muted-foreground">study time</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
