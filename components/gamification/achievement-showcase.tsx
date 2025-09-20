"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Lock, Star } from "lucide-react"
import type { Achievement } from "@/types/gamification"

interface AchievementShowcaseProps {
  achievements: Achievement[]
  showAll?: boolean
}

export function AchievementShowcase({ achievements, showAll = false }: AchievementShowcaseProps) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800"
      case "rare":
        return "bg-blue-100 text-blue-800"
      case "epic":
        return "bg-purple-100 text-purple-800"
      case "legendary":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "academic":
        return "📚"
      case "streak":
        return "🔥"
      case "social":
        return "👥"
      case "milestone":
        return "🎯"
      default:
        return "⭐"
    }
  }

  const displayAchievements = showAll ? achievements : achievements.slice(0, 6)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {displayAchievements.map((achievement) => (
        <Card
          key={achievement.id}
          className={`relative overflow-hidden transition-all hover:shadow-lg ${
            achievement.unlockedAt ? "bg-gradient-to-br from-accent/5 to-primary/5" : "opacity-75"
          }`}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div
                className={`w-12 h-12 rounded-full ${achievement.color} flex items-center justify-center text-white text-xl relative`}
              >
                {achievement.unlockedAt ? achievement.icon : <Lock className="h-6 w-6" />}
                {achievement.rarity === "legendary" && (
                  <Star className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 fill-current" />
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                  {achievement.rarity}
                </Badge>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <span>{getCategoryIcon(achievement.category)}</span>
                  <span>{achievement.category}</span>
                </div>
              </div>
            </div>

            <div>
              <CardTitle className="text-lg">{achievement.name}</CardTitle>
              <CardDescription className="text-sm">{achievement.description}</CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Points</span>
                <Badge variant="secondary" className="bg-accent/10 text-accent">
                  +{achievement.points} XP
                </Badge>
              </div>

              {!achievement.unlockedAt && achievement.progress !== undefined && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{achievement.progress}%</span>
                  </div>
                  <Progress value={achievement.progress} className="h-2" />
                </div>
              )}

              {achievement.unlockedAt && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Trophy className="h-4 w-4" />
                  <span>Unlocked {achievement.unlockedAt.toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
