"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, BookOpen, BarChart3, Trophy } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-foreground">ReadSpeed</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost">About</Button>
            </Link>
            <Link href="/test">
              <Button className="bg-primary hover:bg-primary/90">Start Test</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-balance text-foreground">
            Measure Your English Reading Speed
          </h1>
          <p className="text-lg text-muted-foreground text-balance">
            Take our scientifically designed reading comprehension test. Complete the passage, answer questions, and
            receive your words-per-minute (WPM) score with detailed analytics.
          </p>
          <Link href="/test">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Zap className="w-5 h-5 mr-2" />
              Take Reading Test
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Why Test With ReadSpeed?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border border-border hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="w-8 h-8 text-primary mb-3" />
              <CardTitle>Curated Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Medium-difficulty passages from quality publications like Aeon, ensuring engaging and educational
                content.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border hover:shadow-lg transition-shadow">
            <CardHeader>
              <BarChart3 className="w-8 h-8 text-accent mb-3" />
              <CardTitle>Accurate Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Professional WPM calculation with accuracy scoring based on your comprehension answers.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border hover:shadow-lg transition-shadow">
            <CardHeader>
              <Trophy className="w-8 h-8 text-secondary mb-3" />
              <CardTitle>Track Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Save your test results automatically and monitor your reading improvement over time.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-card border border-border rounded-lg p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">Ready to Test Your Reading Speed?</h2>
          <p className="text-muted-foreground mb-6 text-balance">
            Complete a 400-500 word passage and answer 5 comprehension questions to get your personalized WPM score.
          </p>
          <Link href="/test">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Reading Test Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground text-sm">
          <p>ReadSpeed © 2025. Test your reading speed with scientifically designed passages.</p>
        </div>
      </footer>
    </div>
  )
}
