"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Crown, Medal, Award, Flame, Star } from "lucide-react"
import type { LeaderboardEntry } from "@/types/gamification"

interface LeaderboardProps {
  entries: LeaderboardEntry[]
  currentUserId?: string
}

export function Leaderboard({ entries, currentUserId }: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-orange-500" />
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-100 text-yellow-800"
      case 2:
        return "bg-gray-100 text-gray-800"
      case 3:
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const LeaderboardList = ({
    entries,
    sortBy,
  }: { entries: LeaderboardEntry[]; sortBy: "total" | "weekly" | "monthly" }) => {
    const sortedEntries = [...entries].sort((a, b) => {
      switch (sortBy) {
        case "weekly":
          return b.weeklyPoints - a.weeklyPoints
        case "monthly":
          return b.monthlyPoints - a.monthlyPoints
        default:
          return b.points - a.points
      }
    })

    return (
      <div className="space-y-3">
        {sortedEntries.map((entry, index) => (
          <Card
            key={entry.id}
            className={`transition-all hover:shadow-md ${
              entry.studentId === currentUserId ? "ring-2 ring-primary bg-primary/5" : ""
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8">{getRankIcon(index + 1)}</div>

                  <Avatar className="h-10 w-10">
                    <AvatarImage src={entry.avatar || "/placeholder.svg"} alt={entry.studentName} />
                    <AvatarFallback>{entry.studentName.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{entry.studentName}</h4>
                      {entry.studentId === currentUserId && (
                        <Badge variant="secondary" className="text-xs">
                          You
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>Level {entry.level}</span>
                      <div className="flex items-center gap-1">
                        <Flame className="h-3 w-3 text-red-500" />
                        <span>{entry.streak}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span>{entry.badges}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-bold text-primary">
                    {sortBy === "weekly"
                      ? entry.weeklyPoints
                      : sortBy === "monthly"
                        ? entry.monthlyPoints
                        : entry.points}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {sortBy === "weekly" ? "weekly" : sortBy === "monthly" ? "monthly" : "total"} points
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-yellow-500" />
          Leaderboard
        </CardTitle>
        <CardDescription>See how you rank against other students</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="total" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="total">All Time</TabsTrigger>
            <TabsTrigger value="monthly">This Month</TabsTrigger>
            <TabsTrigger value="weekly">This Week</TabsTrigger>
          </TabsList>

          <TabsContent value="total">
            <LeaderboardList entries={entries} sortBy="total" />
          </TabsContent>

          <TabsContent value="monthly">
            <LeaderboardList entries={entries} sortBy="monthly" />
          </TabsContent>

          <TabsContent value="weekly">
            <LeaderboardList entries={entries} sortBy="weekly" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
