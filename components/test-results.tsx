"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Download, RotateCcw, Info, CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface TestResultsProps {
    results: {
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
    onRetake: () => void
}

export function TestResults({ results, onRetake }: TestResultsProps) {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}m ${secs}s`
    }

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

    const getWpmLevel = (wpm: number) => {
        if (wpm < 100) return { label: "Beginner", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" }
        if (wpm < 200)
            return { label: "Intermediate", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" }
        if (wpm < 300)
            return { label: "Advanced", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" }
        return { label: "Expert", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" }
    }

    const wpmLevel = getWpmLevel(results.wpm)

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Main Results Card */}
            <Card className="border border-border overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">Your Results</CardTitle>
                            <CardDescription>
                                {results.passage} • {new Date(results.timestamp).toLocaleDateString()}
                            </CardDescription>
                        </div>
                        <Badge className={wpmLevel.color}>{wpmLevel.label}</Badge>
                    </div>
                </CardHeader>
                <CardContent className="pt-8 space-y-8">
                    {/* WPM Display */}
                    <div className="text-center space-y-2">
                        <div className="text-6xl font-bold text-primary mb-2">{results.wpm}</div>
                        <p className="text-xl text-muted-foreground">Words Per Minute</p>
                        <p className="text-sm text-muted-foreground">
                            Based on {results.wordCount} words read in {formatTime(results.timeElapsed)}
                        </p>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-3 gap-4">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Card className="border border-border cursor-help">
                                        <CardContent className="pt-6 text-center">
                                            <div className="text-3xl font-bold text-accent mb-1">
                                                {results.correctCount}/{results.totalQuestions}
                                            </div>
                                            <p className="text-xs text-muted-foreground">Questions Correct</p>
                                        </CardContent>
                                    </Card>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>
                                        You answered {results.correctCount} out of {results.totalQuestions} comprehension questions
                                        correctly
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Card className="border border-border cursor-help">
                                        <CardContent className="pt-6 text-center">
                                            <div className="text-3xl font-bold text-secondary mb-1">{results.accuracy.toFixed(0)}%</div>
                                            <p className="text-xs text-muted-foreground">Accuracy Rate</p>
                                        </CardContent>
                                    </Card>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>
                                        Your reading comprehension accuracy: {results.correctCount}/{results.totalQuestions} correct
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Card className="border border-border cursor-help">
                                        <CardContent className="pt-6 text-center">
                                            <div className="text-3xl font-bold text-primary mb-1">{formatTime(results.timeElapsed)}</div>
                                            <p className="text-xs text-muted-foreground">Time Taken</p>
                                        </CardContent>
                                    </Card>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Total time from when you started reading to when you finished the comprehension questions</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    {/* Formula Explanation */}
                    <div className="bg-muted p-4 rounded-lg border border-border space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-foreground flex items-center gap-2">
                                <Info className="w-4 h-4 text-primary" />
                                How Your WPM Was Calculated
                            </h3>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between items-center font-mono">
                                <span>Words ÷ Time (min) × Accuracy</span>
                                <span className="text-primary font-semibold">=</span>
                            </div>
                            <div className="flex justify-between items-center font-mono text-muted-foreground">
                                <span>
                                    {results.wordCount} ÷ {(results.timeElapsed / 60).toFixed(2)} × {(results.accuracy / 100).toFixed(2)}
                                </span>
                                <span className="text-primary font-semibold">=</span>
                            </div>
                            <div className="flex justify-between items-center font-mono">
                                <span>
                                    <strong>{results.wpm} WPM</strong>
                                </span>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Your accuracy is factored into the final score to ensure speed combined with comprehension is what
                            matters.
                        </p>
                    </div>
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
            <Card className="border border-border bg-card">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent" />
                        Tips to Improve Your Reading Speed
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                        <li>Minimize subvocalization (reading every word aloud in your mind)</li>
                        <li>Use peripheral vision to take in multiple words at once</li>
                        <li>Practice regularly with diverse texts and topics</li>
                        <li>Focus on understanding main ideas rather than individual words</li>
                        <li>Avoid regression (going back to re-read words or sentences)</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}
