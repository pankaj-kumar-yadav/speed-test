"use client"

import { useState } from "react"
import { ReadingTest } from "@/components/reading-test"
import { TestResults } from "@/components/test-results"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"

export default function TestPage() {
    const [testCompleted, setTestCompleted] = useState(false)
    const [results, setResults] = useState<any>(null)

    const handleTestComplete = (testResults: any) => {
        setResults(testResults)
        setTestCompleted(true)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
            {/* Navigation */}
            <nav className="border-b border-border">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
                        <BookOpen className="w-6 h-6 text-primary" />
                        <span className="text-xl font-bold text-foreground"></span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost">Home</Button>
                        </Link>
                        <Link href="/about">
                            <Button variant="ghost">About</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {!testCompleted ? (
                    <ReadingTest onComplete={handleTestComplete} />
                ) : results ? (
                    <TestResults results={results} onRetake={() => setTestCompleted(false)} />
                ) : null}
            </div>
        </div>
    )
}
