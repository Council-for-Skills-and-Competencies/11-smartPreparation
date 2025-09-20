"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, GraduationCap } from "lucide-react"
import type { Child } from "@/types/parent"

interface ChildSelectorProps {
  children: Child[]
  selectedChildId: string
  onChildSelect: (childId: string) => void
}

export function ChildSelector({ children, selectedChildId, onChildSelect }: ChildSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {children.map((child) => (
        <Card
          key={child.id}
          className={`cursor-pointer transition-all hover:shadow-md ${
            selectedChildId === child.id ? "ring-2 ring-primary bg-primary/5" : ""
          }`}
          onClick={() => onChildSelect(child.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={child.avatar || "/placeholder.svg"} alt={child.name} />
                <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h3 className="font-medium">{child.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <GraduationCap className="h-3 w-3" />
                  <span>{child.grade}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Exam: {child.targetExamDate.toLocaleDateString()}</span>
                </div>
              </div>

              {selectedChildId === child.id && (
                <Badge variant="default" className="bg-primary">
                  Selected
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
