"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AchievementShowcase } from "@/components/gamification/achievement-showcase"
import { Leaderboard } from "@/components/gamification/leaderboard"
import { StreakTracker } from "@/components/gamification/streak-tracker"
import { RewardsStore } from "@/components/gamification/rewards-store"
import { achievements, mockLeaderboard, rewards, mockStudyStreak, mockLevelSystem } from "@/lib/gamification-data"
import { Trophy, Crown, Flame, ShoppingCart } from "lucide-react"

export default function GamificationPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [currentPoints, setCurrentPoints] = useState(mockLevelSystem.totalXP)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth")
    }
  }, [user, loading, router])

  const handlePurchase = (rewardId: string) => {
    const reward = rewards.find((r) => r.id === rewardId)
    if (reward && currentPoints >= reward.cost) {
      setCurrentPoints((prev) => prev - reward.cost)
      // Update reward status (in real app, this would be an API call)
      reward.isPurchased = true
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading gamification...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              Achievements & Rewards
            </CardTitle>
            <CardDescription>Track your progress, earn achievements, and unlock exclusive rewards</CardDescription>
          </CardHeader>
        </Card>

        <Tabs defaultValue="achievements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Crown className="h-4 w-4" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="streaks" className="flex items-center gap-2">
              <Flame className="h-4 w-4" />
              Streaks
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Rewards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-6">
            <AchievementShowcase achievements={achievements} showAll={true} />
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Leaderboard entries={mockLeaderboard} currentUserId={user.id} />
          </TabsContent>

          <TabsContent value="streaks" className="space-y-6">
            <StreakTracker streak={mockStudyStreak} />
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <RewardsStore rewards={rewards} currentPoints={currentPoints} onPurchase={handlePurchase} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
