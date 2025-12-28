"use client"

import { ReadingTest } from "@/components/reading-test"
import { TestResults } from "@/components/test-results"
import { useState } from "react"

export default function TestPage() {
    const [testCompleted, setTestCompleted] = useState(false)
    const [results, setResults] = useState<any>(null)

    const handleTestComplete = (testResults: any) => {
        setResults(testResults)
        setTestCompleted(true)
    }

    return (
        <>
            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {!testCompleted ? (
                    <ReadingTest onComplete={handleTestComplete} />
                ) : results ? (
                    <TestResults results={results} onRetake={() => setTestCompleted(false)} />
                ) : null}
            </div>
        </>
    )
}
