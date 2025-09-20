"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Save, Eye, Send } from "lucide-react"
import type { TestCreation } from "@/types/teacher"

interface TestCreatorProps {
  onSave: (test: TestCreation) => void
  onPreview: (test: TestCreation) => void
  initialTest?: TestCreation
}

export function TestCreator({ onSave, onPreview, initialTest }: TestCreatorProps) {
  const [test, setTest] = useState<TestCreation>(
    initialTest || {
      title: "",
      description: "",
      subject: "maths",
      difficulty: "medium",
      duration: 30,
      totalQuestions: 10,
      passingScore: 70,
      isAdaptive: false,
      tags: [],
      questions: [],
      assignedTo: [],
      status: "draft",
    },
  )

  const [newTag, setNewTag] = useState("")
  const [currentQuestion, setCurrentQuestion] = useState({
    type: "multiple-choice" as const,
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    explanation: "",
    points: 1,
    timeLimit: 60,
  })

  const addTag = () => {
    if (newTag.trim() && !test.tags.includes(newTag.trim())) {
      setTest({ ...test, tags: [...test.tags, newTag.trim()] })
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTest({ ...test, tags: test.tags.filter((tag) => tag !== tagToRemove) })
  }

  const addQuestion = () => {
    if (currentQuestion.question.trim()) {
      const newQuestion = {
        ...currentQuestion,
        id: Date.now().toString(),
        options:
          currentQuestion.type === "multiple-choice" ? currentQuestion.options.filter((opt) => opt.trim()) : undefined,
      }
      setTest({ ...test, questions: [...test.questions, newQuestion] })
      setCurrentQuestion({
        type: "multiple-choice",
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        explanation: "",
        points: 1,
        timeLimit: 60,
      })
    }
  }

  const removeQuestion = (index: number) => {
    setTest({ ...test, questions: test.questions.filter((_, i) => i !== index) })
  }

  const handleSave = () => {
    onSave({ ...test, totalQuestions: test.questions.length })
  }

  const handlePreview = () => {
    onPreview({ ...test, totalQuestions: test.questions.length })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Test</CardTitle>
          <CardDescription>Design a comprehensive assessment for your students</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Test Details</TabsTrigger>
          <TabsTrigger value="questions">Questions ({test.questions.length})</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Test Title</Label>
                  <Input
                    id="title"
                    value={test.title}
                    onChange={(e) => setTest({ ...test, title: e.target.value })}
                    placeholder="Enter test title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={test.subject} onValueChange={(value) => setTest({ ...test, subject: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maths">Mathematics</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="reasoning">Reasoning</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={test.description}
                  onChange={(e) => setTest({ ...test, description: e.target.value })}
                  placeholder="Describe what this test covers"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select
                    value={test.difficulty}
                    onValueChange={(value: any) => setTest({ ...test, difficulty: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={test.duration}
                    onChange={(e) => setTest({ ...test, duration: Number.parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passingScore">Passing Score (%)</Label>
                  <Input
                    id="passingScore"
                    type="number"
                    value={test.passingScore}
                    onChange={(e) => setTest({ ...test, passingScore: Number.parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                  />
                  <Button onClick={addTag} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {test.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="space-y-6">
          {/* Add Question Form */}
          <Card>
            <CardHeader>
              <CardTitle>Add Question</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Question Type</Label>
                  <Select
                    value={currentQuestion.type}
                    onValueChange={(value: any) => setCurrentQuestion({ ...currentQuestion, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                      <SelectItem value="true-false">True/False</SelectItem>
                      <SelectItem value="fill-blank">Fill in the Blank</SelectItem>
                      <SelectItem value="essay">Essay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Points</Label>
                  <Input
                    type="number"
                    value={currentQuestion.points}
                    onChange={(e) =>
                      setCurrentQuestion({ ...currentQuestion, points: Number.parseInt(e.target.value) || 1 })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Question</Label>
                <Textarea
                  value={currentQuestion.question}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                  placeholder="Enter your question"
                  rows={3}
                />
              </div>

              {currentQuestion.type === "multiple-choice" && (
                <div className="space-y-2">
                  <Label>Options</Label>
                  {currentQuestion.options.map((option, index) => (
                    <Input
                      key={index}
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...currentQuestion.options]
                        newOptions[index] = e.target.value
                        setCurrentQuestion({ ...currentQuestion, options: newOptions })
                      }}
                      placeholder={`Option ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <Label>Correct Answer</Label>
                <Input
                  value={currentQuestion.correctAnswer}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })}
                  placeholder="Enter the correct answer"
                />
              </div>

              <div className="space-y-2">
                <Label>Explanation</Label>
                <Textarea
                  value={currentQuestion.explanation}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, explanation: e.target.value })}
                  placeholder="Explain why this is the correct answer"
                  rows={2}
                />
              </div>

              <Button onClick={addQuestion} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </CardContent>
          </Card>

          {/* Questions List */}
          {test.questions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Questions ({test.questions.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {test.questions.map((question, index) => (
                    <div key={question.id || index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Q{index + 1}</Badge>
                          <Badge variant="secondary">{question.type}</Badge>
                          <Badge variant="outline">{question.points} pts</Badge>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeQuestion(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="font-medium mb-2">{question.question}</p>
                      {question.options && (
                        <div className="text-sm text-muted-foreground">Options: {question.options.join(", ")}</div>
                      )}
                      <div className="text-sm text-muted-foreground">
                        Correct:{" "}
                        {Array.isArray(question.correctAnswer)
                          ? question.correctAnswer.join(", ")
                          : question.correctAnswer}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Test Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Adaptive Testing</Label>
                  <p className="text-sm text-muted-foreground">
                    Adjust question difficulty based on student performance
                  </p>
                </div>
                <Switch
                  checked={test.isAdaptive}
                  onCheckedChange={(checked) => setTest({ ...test, isAdaptive: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={handlePreview}>
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
        <Button variant="outline" onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Draft
        </Button>
        <Button onClick={() => onSave({ ...test, status: "published" })}>
          <Send className="h-4 w-4 mr-2" />
          Publish Test
        </Button>
      </div>
    </div>
  )
}
