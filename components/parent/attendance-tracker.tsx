"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, BookOpen } from "lucide-react"
import type { ChildPerformance } from "@/types/parent"

interface AttendanceTrackerProps {
  performance: ChildPerformance
}

export function AttendanceTracker({ performance }: AttendanceTrackerProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case "maths":
        return "bg-blue-100 text-blue-800"
      case "english":
        return "bg-green-100 text-green-800"
      case "reasoning":
        return "bg-purple-100 text-purple-800"
      case "science":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Calculate weekly stats
  const totalWeeklyTime = performance.attendance.reduce((sum, day) => sum + day.studyTime, 0)
  const totalWeeklyTests = performance.attendance.reduce((sum, day) => sum + day.testsCompleted, 0)
  const activeDays = performance.attendance.length
  const averageDailyTime = activeDays > 0 ? Math.round(totalWeeklyTime / activeDays) : 0

  return (
    <div className="space-y-6">
      {/* Weekly Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Days</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{activeDays}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Study Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{formatTime(totalWeeklyTime)}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tests Completed</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalWeeklyTests}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Average</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{formatTime(averageDailyTime)}</div>
            <p className="text-xs text-muted-foreground">Per active day</p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Activity</CardTitle>
          <CardDescription>Detailed breakdown of daily study sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performance.attendance.map((day, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {day.date.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-primary">{formatTime(day.studyTime)}</div>
                    <div className="text-xs text-muted-foreground">
                      {day.testsCompleted} {day.testsCompleted === 1 ? "test" : "tests"}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {day.subjects.map((subject) => (
                    <Badge key={subject} className={getSubjectColor(subject)}>
                      {subject.charAt(0).toUpperCase() + subject.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
