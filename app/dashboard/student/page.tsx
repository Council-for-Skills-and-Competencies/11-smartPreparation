"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { DashboardHeader } from "@/components/student/dashboard-header"
import { ProgressOverview } from "@/components/student/progress-overview"
import { GamificationPanel } from "@/components/student/gamification-panel"
import { SubjectGrid } from "@/components/student/subject-grid"
import { RecentActivity } from "@/components/student/recent-activity"
import { subjects, mockStudentProgress, mockGamificationData } from "@/lib/student-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StudentDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.role !== "student")) {
      router.push("/auth")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== "student") {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-6">
        <DashboardHeader />

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <ProgressOverview progress={mockStudentProgress} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SubjectGrid subjects={subjects} />
              </div>
              <div>
                <RecentActivity results={mockStudentProgress.recentActivity} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="subjects" className="space-y-6">
            <SubjectGrid subjects={subjects} />
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <GamificationPanel data={mockGamificationData} />
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <RecentActivity results={mockStudentProgress.recentActivity} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
