"use client";

import { AllAnswered } from "@/components/features/test/questions/all-answered";
import type { Passage } from "@/components/reading-test";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

interface QuestionsScreenProps {
    passage: Passage;
    timeElapsed: number;
    onComplete: (results: any) => void;
}

export const QuestionsScreen = (props: QuestionsScreenProps) => {
    const { passage, timeElapsed, onComplete } = props;
    const [answers, setAnswers] = useState<Record<number, number>>({})


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
            console.error("Failed to save results:", error)
        }

        onComplete(results)
    }

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
                <AllAnswered />
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
