"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Target } from "lucide-react"
import type { StudentProgress } from "@/types/student"

interface ProgressOverviewProps {
  progress: StudentProgress
}

export function ProgressOverview({ progress }: ProgressOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{progress.totalTests}</div>
          <p className="text-xs text-muted-foreground">Completed this month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{progress.averageScore}%</div>
          <p className="text-xs text-muted-foreground">+2.5% from last week</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Strong Subjects</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1">
            {progress.strongSubjects.map((subject) => (
              <Badge key={subject} variant="secondary" className="text-xs bg-green-100 text-green-800">
                {subject}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">Keep up the great work!</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Needs Focus</CardTitle>
          <TrendingDown className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1">
            {progress.weakSubjects.map((subject) => (
              <Badge key={subject} variant="secondary" className="text-xs bg-orange-100 text-orange-800">
                {subject}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">Practice more to improve</p>
        </CardContent>
      </Card>
    </div>
  )
}
