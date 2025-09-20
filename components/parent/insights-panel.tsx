"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lightbulb, AlertTriangle, Info, Trophy, TrendingUp, Calendar } from "lucide-react"
import type { ParentInsights } from "@/types/parent"

interface InsightsPanelProps {
  insights: ParentInsights
}

export function InsightsPanel({ insights }: InsightsPanelProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "performance_drop":
        return <AlertTriangle className="h-4 w-4" />
      case "missed_study":
        return <Calendar className="h-4 w-4" />
      case "streak_broken":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getMilestoneIcon = (category: string) => {
    switch (category) {
      case "academic":
        return "🎓"
      case "consistency":
        return "🔥"
      case "improvement":
        return "📈"
      default:
        return "⭐"
    }
  }

  return (
    <div className="space-y-6">
      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Recommendations
          </CardTitle>
          <CardDescription>Personalized suggestions to help your child improve</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.recommendations.map((rec, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium">{rec.title}</h4>
                  <Badge className={getPriorityColor(rec.priority)}>{rec.priority} priority</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                <div className="space-y-1">
                  <h5 className="text-sm font-medium">Action Items:</h5>
                  <ul className="text-sm space-y-1">
                    {rec.actionItems.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      {insights.alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Alerts & Notifications
            </CardTitle>
            <CardDescription>Important updates about your child's progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {insights.alerts.map((alert, index) => (
                <Alert key={index} variant={alert.severity === "error" ? "destructive" : "default"}>
                  {getAlertIcon(alert.type)}
                  <AlertDescription className="ml-2">
                    <div className="flex justify-between items-start">
                      <span>{alert.message}</span>
                      <span className="text-xs text-muted-foreground">{alert.date.toLocaleDateString()}</span>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Recent Milestones
          </CardTitle>
          <CardDescription>Celebrate your child's achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {insights.milestones.map((milestone, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl">{getMilestoneIcon(milestone.category)}</div>
                <div className="flex-1">
                  <h4 className="font-medium">{milestone.title}</h4>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{milestone.achievedAt.toLocaleDateString()}</p>
                </div>
                <Badge variant="outline" className="capitalize">
                  {milestone.category}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
