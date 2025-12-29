"use client"

import { ReadyScreen } from "@/components/features/test/ready-screen"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"
import { QuestionsScreen } from "@/components/features/test/questions/questions-screen"
import { ReadingScreen } from "@/components/features/test/reading-screen"

export interface Passage {
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

type Stage = "ready" | "reading" | "questions";

export function ReadingTest(props: ReadingTestProps) {
    const { onComplete } = props;
    const [stage, setStage] = useState<Stage>("ready")
    const [timeElapsed, setTimeElapsed] = useState<number>(0)
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
                console.error("Failed to load passages:", error)
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

    if (stage === "ready") {
        return (
            <ReadyScreen
                passage={passage}
                handleStartReading={handleStartReading}
            />
        )
    }

    if (stage === "reading") {
        return (
            <ReadingScreen
                passage={passage}
                timeElapsed={timeElapsed}
                handleFinishReading={handleFinishReading}
            />
        )
    }

    if (stage === "questions") {
        return (
            <QuestionsScreen
                passage={passage}
                timeElapsed={timeElapsed}
                onComplete={onComplete}
            />
        )
    }
}
