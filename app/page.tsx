"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, BookOpen, Trophy, Users, BarChart3, Video } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      // Redirect authenticated users to their dashboard
      switch (user.role) {
        case "student":
          router.push("/dashboard/student")
          break
        case "parent":
          router.push("/dashboard/parent")
          break
        case "teacher":
          router.push("/dashboard/teacher")
          break
        default:
          router.push("/dashboard")
      }
    }
  }, [user, router])

  const features = [
    {
      icon: BookOpen,
      title: "Mock Tests",
      description: "Comprehensive practice tests with adaptive difficulty and instant feedback",
    },
    {
      icon: Trophy,
      title: "Gamification",
      description: "Earn badges, maintain streaks, and compete on leaderboards",
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Detailed analytics and reports for students, parents, and teachers",
    },
    {
      icon: Video,
      title: "Live Classes",
      description: "Interactive video sessions and group discussions with expert teachers",
    },
    {
      icon: Users,
      title: "Multi-Role Support",
      description: "Tailored dashboards for students, parents, and teachers",
    },
    {
      icon: GraduationCap,
      title: "Expert Content",
      description: "Curated study materials, past papers, and educational resources",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-primary text-primary-foreground p-4 rounded-full">
            <GraduationCap className="h-12 w-12" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 text-balance">11+ SmartPrep</h1>

        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
          The comprehensive EdTech platform designed specifically for 11+ exam preparation. Mock tests, gamification,
          progress tracking, and live sessions all in one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/auth">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
            <Link href="#features">Learn More</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Everything You Need for 11+ Success</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform combines the best educational tools with engaging gamification to make exam preparation
            effective and enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="bg-accent text-accent-foreground p-3 rounded-full">
                    <feature.icon className="h-6 w-6" />
                  </div>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Card className="max-w-2xl mx-auto bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Ready to Start Your 11+ Journey?</CardTitle>
            <CardDescription className="text-primary-foreground/80 text-lg">
              Join thousands of students, parents, and teachers who trust SmartPrep for comprehensive exam preparation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link href="/auth">Create Your Account</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
