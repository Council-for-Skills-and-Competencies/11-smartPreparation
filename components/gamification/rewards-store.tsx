"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Star, Check, Lock } from "lucide-react"
import type { Reward } from "@/types/gamification"

interface RewardsStoreProps {
  rewards: Reward[]
  currentPoints: number
  onPurchase: (rewardId: string) => void
}

export function RewardsStore({ rewards, currentPoints, onPurchase }: RewardsStoreProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "cosmetic", "title", "theme", "feature"]

  const filteredRewards =
    selectedCategory === "all" ? rewards : rewards.filter((reward) => reward.category === selectedCategory)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "badge":
        return "🏆"
      case "title":
        return "👑"
      case "avatar":
        return "🖼️"
      case "theme":
        return "🎨"
      case "feature":
        return "⚡"
      default:
        return "🎁"
    }
  }

  const canAfford = (cost: number) => currentPoints >= cost

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Rewards Store
        </CardTitle>
        <CardDescription>Spend your points on exclusive rewards and customizations</CardDescription>
        <div className="flex items-center gap-2 pt-2">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="font-medium">{currentPoints} points available</span>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="text-xs">
                {category === "all" ? "All" : category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRewards.map((reward) => (
              <Card
                key={reward.id}
                className={`transition-all hover:shadow-md ${
                  reward.isPurchased ? "bg-green-50 border-green-200" : !reward.isUnlocked ? "opacity-60" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">
                        {reward.isPurchased ? "✅" : !reward.isUnlocked ? "🔒" : reward.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{reward.name}</h4>
                        <p className="text-sm text-muted-foreground">{reward.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {getTypeIcon(reward.type)} {reward.type}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className={`font-bold ${canAfford(reward.cost) ? "text-primary" : "text-muted-foreground"}`}>
                        {reward.cost} pts
                      </div>

                      {reward.isPurchased ? (
                        <Badge variant="default" className="bg-green-600">
                          <Check className="h-3 w-3 mr-1" />
                          Owned
                        </Badge>
                      ) : !reward.isUnlocked ? (
                        <Badge variant="secondary">
                          <Lock className="h-3 w-3 mr-1" />
                          Locked
                        </Badge>
                      ) : (
                        <Button size="sm" disabled={!canAfford(reward.cost)} onClick={() => onPurchase(reward.id)}>
                          Buy
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
