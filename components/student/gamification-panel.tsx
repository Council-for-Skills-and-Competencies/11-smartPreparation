"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Flame, Star, Users } from "lucide-react"
import type { GamificationData } from "@/types/student"

interface GamificationPanelProps {
  data: GamificationData
}

export function GamificationPanel({ data }: GamificationPanelProps) {
  const xpProgress = (data.currentXP / data.xpToNextLevel) * 100

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Level and XP */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-accent" />
            Level {data.level}
          </CardTitle>
          <CardDescription>{data.xpToNextLevel - data.currentXP} XP to next level</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={xpProgress} className="mb-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{data.currentXP} XP</span>
            <span>{data.xpToNextLevel} XP</span>
          </div>
        </CardContent>
      </Card>

      {/* Streak and Rank */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Flame className="h-4 w-4 text-red-500" />
              Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{data.streak}</div>
            <p className="text-xs text-muted-foreground">Best: {data.longestStreak} days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Rank
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">#{data.rank}</div>
            <p className="text-xs text-muted-foreground">of {data.totalStudents}</p>
          </CardContent>
        </Card>
      </div>

      {/* Badges */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-accent" />
            Achievements ({data.badges.length})
          </CardTitle>
          <CardDescription>Badges you've earned on your learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {data.badges.map((badge) => (
              <div key={badge.id} className="text-center">
                <div
                  className={`w-12 h-12 rounded-full ${badge.color} flex items-center justify-center text-white text-xl mb-2 mx-auto`}
                >
                  {badge.icon}
                </div>
                <h4 className="font-medium text-sm">{badge.name}</h4>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
