"use client"

import { CTASection } from "@/components/features/cta-section"
import { HomeFeatures } from "@/components/features/home-features"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <>
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
            <Button size="lg" className="bg-primary hover:bg-primary/90 cursor-pointer">
              <Zap className="w-5 h-5 mr-2" />
              Take Reading Test
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <HomeFeatures />

      {/* CTA Section */}
      <CTASection />
    </>
  )
}
