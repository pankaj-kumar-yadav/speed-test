"use client"

import { TipsSection } from "@/components/features/test-results/tips-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Download, RotateCcw } from "lucide-react"
import Link from "next/link"
import { FormulaExplanation } from "@/components/features/test-results/formula-explanation"
import { MetricsCard } from "@/components/features/test-results/results-card/metrics-card"
import { ResultsCardHeader } from "@/components/features/test-results/results-card/results-card-header"
import { WPMDisplay } from "@/components/features/test-results/results-card/wpm-display"

export interface Results {
    wpm: number
    accuracy: number
    correctCount: number
    totalQuestions: number
    timeElapsed: number
    wordCount: number
    timestamp: string
    passage: string
    source: string
    passagePreview: string
}

export interface WPMLevel {
    label: string;
    color: string;
}

interface TestResultsProps {
    results: Results;
    onRetake: () => void
}

export function TestResults({ results, onRetake }: TestResultsProps) {
    const downloadResults = () => {
        const resultsJson = JSON.stringify(results, null, 2)
        const element = document.createElement("a")
        element.setAttribute("href", "data:application/json;charset=utf-8," + encodeURIComponent(resultsJson))
        element.setAttribute("download", `readspeed-results-${Date.now()}.json`)
        element.style.display = "none"
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }

    const getWpmLevel = (wpm: number): WPMLevel => {
        if (wpm < 100) return { label: "Beginner", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" }
        if (wpm < 200)
            return { label: "Intermediate", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" }
        if (wpm < 300)
            return { label: "Advanced", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" }
        return { label: "Expert", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" }
    }

    const wpmLevel: WPMLevel = getWpmLevel(results.wpm)

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Main Results Card */}
            <Card className="border border-border overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
                    <ResultsCardHeader
                        results={results}
                        wpmLevel={wpmLevel}
                    />
                </CardHeader>
                <CardContent className="pt-8 space-y-8">
                    <WPMDisplay
                        results={results}
                    />

                    <MetricsCard
                        results={results}
                    />

                    <FormulaExplanation
                        results={results}
                    />

                </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3 flex-col sm:flex-row">
                <Button onClick={downloadResults} variant="outline" className="flex-1 bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Download Results (JSON)
                </Button>
                <Button onClick={onRetake} variant="outline" className="flex-1 bg-transparent">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Retake Test
                </Button>
                <Link href="/" className="flex-1">
                    <Button className="w-full bg-primary hover:bg-primary/90">Back to Home</Button>
                </Link>
            </div>

            {/* Tips Section */}
            <TipsSection />
        </div>
    )
}
