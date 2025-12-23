"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AlertCircle, Info, Play } from "lucide-react"

interface Passage {
    id: number
    title: string
    source: string
    difficulty: string
    content: string
    wordCount: number
    questions: Array<{
        id: number
        question: string
        options: string[]
        correct: number
    }>
}

interface ReadingTestProps {
    onComplete: (results: any) => void
}

export function ReadingTest({ onComplete }: ReadingTestProps) {
    const [stage, setStage] = useState<"ready" | "reading" | "questions">("ready")
    const [timeElapsed, setTimeElapsed] = useState(0)
    const [answers, setAnswers] = useState<Record<number, number>>({})
    const [passage, setPassage] = useState<Passage | null>(null)
    const [loading, setLoading] = useState(true)
    const startTimeRef = useRef<number | null>(null)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const loadPassages = async () => {
            try {
                const response = await fetch("/passages.json")
                const data = await response.json()
                const passages: Passage[] = data.passages

                // Random algorithm: select random passage from array
                const randomIndex = Math.floor(Math.random() * passages.length)
                setPassage(passages[randomIndex])
                setLoading(false)
            } catch (error) {
                console.error("[v0] Failed to load passages:", error)
                setLoading(false)
            }
        }

        loadPassages()
    }, [])

    if (loading || !passage) {
        return (
            <div className="max-w-2xl mx-auto">
                <Card className="border border-border">
                    <CardContent className="pt-8">
                        <p className="text-muted-foreground text-center">Loading passage...</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const handleStartReading = () => {
        setStage("reading")
        startTimeRef.current = Date.now()

        timerRef.current = setInterval(() => {
            if (startTimeRef.current) {
                setTimeElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000))
            }
        }, 100)
    }

    const handleFinishReading = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }
        setStage("questions")
    }

    const handleAnswerSelect = (questionId: number, optionIndex: number) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: optionIndex,
        }))
    }

    const handleSubmitAnswers = async () => {
        // Calculate accuracy
        let correctCount = 0
        passage.questions.forEach((q) => {
            if (answers[q.id] === q.correct) {
                correctCount++
            }
        })

        const accuracy = (correctCount / passage.questions.length) * 100
        const timeInMinutes = timeElapsed / 60
        const wpm = Math.round((passage.wordCount / timeInMinutes) * (accuracy / 100))

        const results = {
            wpm,
            accuracy,
            correctCount,
            totalQuestions: passage.questions.length,
            timeElapsed,
            wordCount: passage.wordCount,
            timestamp: new Date().toISOString(),
            passage: passage.title,
            source: passage.source,
            passagePreview: passage.content.substring(0, 100) + "...",
        }

        try {
            await fetch("/api/save-result", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(results),
            })
        } catch (error) {
            console.error("[v0] Failed to save results:", error)
        }

        onComplete(results)
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, "0")}`
    }

    if (stage === "ready") {
        return (
            <div className="max-w-2xl mx-auto">
                <Card className="border border-border">
                    <CardHeader>
                        <CardTitle className="text-3xl">English Reading Speed Test</CardTitle>
                        <CardDescription>
                            {passage.title} - {passage.source}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="font-semibold text-foreground flex items-center gap-2">
                                <Info className="w-5 h-5 text-primary" />
                                How This Test Works
                            </h3>
                            <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-2">
                                <li>Click "Start Reading" to begin. The timer will start immediately.</li>
                                <li>Read the passage below at your natural pace.</li>
                                <li>When done, click "Finish Reading" to proceed to comprehension questions.</li>
                                <li>Answer 5 multiple-choice questions based on the passage.</li>
                                <li>Your WPM is calculated based on reading time and accuracy.</li>
                            </ol>
                        </div>

                        <div className="bg-muted p-4 rounded-lg border border-border">
                            <p className="text-sm text-muted-foreground">
                                <strong>Word Count:</strong> {passage.wordCount} words
                            </p>
                            <p className="text-sm text-muted-foreground">
                                <strong>Difficulty:</strong> {passage.difficulty}
                            </p>
                        </div>

                        <Button onClick={handleStartReading} size="lg" className="w-full bg-primary hover:bg-primary/90">
                            <Play className="w-5 h-5 mr-2" />
                            Start Reading
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (stage === "reading") {
        return (
            <div className="max-w-3xl mx-auto">
                <Card className="border border-border">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Reading Passage</CardTitle>
                            <CardDescription>Read at your natural pace</CardDescription>
                        </div>
                        <div className="text-3xl font-mono font-bold text-primary">{formatTime(timeElapsed)}</div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="prose prose-sm max-w-none">
                            <div className="text-lg leading-relaxed text-foreground whitespace-pre-wrap bg-card p-6 rounded-lg border border-border">
                                {passage.content}
                            </div>
                        </div>

                        <Button onClick={handleFinishReading} size="lg" className="w-full bg-accent hover:bg-accent/90">
                            Finish Reading & Answer Questions
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (stage === "questions") {
        const allAnswered = Object.keys(answers).length === passage.questions.length

        return (
            <div className="max-w-2xl mx-auto space-y-6">
                <Card className="border border-border">
                    <CardHeader>
                        <CardTitle>Comprehension Questions</CardTitle>
                        <CardDescription>
                            Answer the following {passage.questions.length} questions based on the passage you just read
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        {passage.questions.map((question) => (
                            <div key={question.id} className="space-y-4">
                                <h3 className="font-semibold text-foreground">
                                    {question.id}. {question.question}
                                </h3>
                                <RadioGroup
                                    value={answers[question.id]?.toString() ?? ""}
                                    onValueChange={(value) => handleAnswerSelect(question.id, Number.parseInt(value))}
                                >
                                    <div className="space-y-3">
                                        {question.options.map((option, idx) => (
                                            <div key={idx} className="flex items-center space-x-2">
                                                <RadioGroupItem value={idx.toString()} id={`q${question.id}-o${idx}`} />
                                                <Label htmlFor={`q${question.id}-o${idx}`} className="flex-1 cursor-pointer">
                                                    {option}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </RadioGroup>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {!allAnswered && (
                    <Card className="border border-destructive bg-destructive/5">
                        <CardContent className="pt-6 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-destructive">Please answer all questions before submitting.</p>
                        </CardContent>
                    </Card>
                )}

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={handleSubmitAnswers}
                                disabled={!allAnswered}
                                size="lg"
                                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50"
                            >
                                Submit Answers & Get Results
                            </Button>
                        </TooltipTrigger>
                        {!allAnswered && <TooltipContent>Answer all questions to proceed</TooltipContent>}
                    </Tooltip>
                </TooltipProvider>
            </div>
        )
    }
}
