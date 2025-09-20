"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClassOverview } from "@/components/teacher/class-overview"
import { StudentManagement } from "@/components/teacher/student-management"
import { TestCreator } from "@/components/teacher/test-creator"
import { mockTeacherStudents, mockClassAnalytics, mockTestTemplates } from "@/lib/teacher-data"
import type { TestCreation } from "@/types/teacher"
import { Users, BarChart3, FileText, Settings } from "lucide-react"

export default function TeacherDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [selectedStudentId, setSelectedStudentId] = useState<string>("")

  useEffect(() => {
    if (!loading && (!user || user.role !== "teacher")) {
      router.push("/auth")
    }
  }, [user, loading, router])

  const handleSaveTest = (test: TestCreation) => {
    console.log("Saving test:", test)
    // In a real app, this would save to the backend
  }

  const handlePreviewTest = (test: TestCreation) => {
    console.log("Previewing test:", test)
    // In a real app, this would open a preview modal
  }

  const handleStudentSelect = (studentId: string) => {
    setSelectedStudentId(studentId)
    // In a real app, this might navigate to a detailed student view
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading teacher dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== "teacher") {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Teacher Dashboard
            </CardTitle>
            <CardDescription>Manage your students, create tests, and track class performance</CardDescription>
          </CardHeader>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Class Overview
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Students
            </TabsTrigger>
            <TabsTrigger value="tests" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Create Tests
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Manage Tests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <ClassOverview analytics={mockClassAnalytics} />
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <StudentManagement students={mockTeacherStudents} onStudentSelect={handleStudentSelect} />
          </TabsContent>

          <TabsContent value="tests" className="space-y-6">
            <TestCreator onSave={handleSaveTest} onPreview={handlePreviewTest} />
          </TabsContent>

          <TabsContent value="manage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manage Tests</CardTitle>
                <CardDescription>View, edit, and manage your created tests</CardDescription>
              </CardHeader>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockTestTemplates.map((test) => (
                <Card key={test.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{test.title}</CardTitle>
                    <CardDescription>{test.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
