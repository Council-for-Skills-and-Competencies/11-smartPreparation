"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Play } from "lucide-react"
import type { Subject } from "@/types/student"
import Link from "next/link"

interface SubjectGridProps {
  subjects: Subject[]
}

export function SubjectGrid({ subjects }: SubjectGridProps) {
  // Mock progress data for each subject
  const subjectProgress = {
    maths: { completed: 12, total: 20, average: 85 },
    english: { completed: 15, total: 18, average: 92 },
    reasoning: { completed: 8, total: 15, average: 78 },
    science: { completed: 5, total: 12, average: 68 },
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {subjects.map((subject) => {
        const progress = subjectProgress[subject.id as keyof typeof subjectProgress]
        const progressPercentage = (progress.completed / progress.total) * 100

        return (
          <Card key={subject.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div
                  className={`w-10 h-10 rounded-lg ${subject.color} flex items-center justify-center text-white text-lg`}
                >
                  {subject.icon}
                </div>
                <Button variant="ghost" size="sm">
                  <Play className="h-4 w-4" />
                </Button>
              </div>
              <CardTitle className="text-lg">{subject.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>
                      {progress.completed}/{progress.total}
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average</span>
                  <span
                    className={`font-medium ${
                      progress.average >= 85
                        ? "text-green-600"
                        : progress.average >= 75
                          ? "text-blue-600"
                          : progress.average >= 60
                            ? "text-orange-600"
                            : "text-red-600"
                    }`}
                  >
                    {progress.average}%
                  </span>
                </div>

                <Button className="w-full" size="sm" asChild>
                  <Link href="/tests">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Practice Now
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
