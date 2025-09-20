"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChildSelector } from "@/components/parent/child-selector"
import { PerformanceOverview } from "@/components/parent/performance-overview"
import { InsightsPanel } from "@/components/parent/insights-panel"
import { AttendanceTracker } from "@/components/parent/attendance-tracker"
import { mockChildren, mockChildPerformance, mockParentInsights } from "@/lib/parent-data"
import { Users, BarChart3, Lightbulb, Calendar } from "lucide-react"

export default function ParentDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [selectedChildId, setSelectedChildId] = useState(mockChildren[0]?.id || "")

  useEffect(() => {
    if (!loading && (!user || user.role !== "parent")) {
      router.push("/auth")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading parent dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== "parent") {
    return null
  }

  const selectedChild = mockChildren.find((child) => child.id === selectedChildId)
  const childPerformance = mockChildPerformance.find((perf) => perf.childId === selectedChildId)
  const childInsights = mockParentInsights.find((insights) => insights.childId === selectedChildId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Parent Dashboard
            </CardTitle>
            <CardDescription>Monitor your child's progress, performance, and get personalized insights</CardDescription>
          </CardHeader>
        </Card>

        {/* Child Selector */}
        <ChildSelector children={mockChildren} selectedChildId={selectedChildId} onChildSelect={setSelectedChildId} />

        {selectedChild && childPerformance && childInsights && (
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Insights
              </TabsTrigger>
              <TabsTrigger value="attendance" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Attendance
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Reports
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <PerformanceOverview performance={childPerformance} />
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <InsightsPanel insights={childInsights} />
            </TabsContent>

            <TabsContent value="attendance" className="space-y-6">
              <AttendanceTracker performance={childPerformance} />
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Reports</CardTitle>
                  <CardDescription>Comprehensive performance reports and analytics (Coming Soon)</CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
