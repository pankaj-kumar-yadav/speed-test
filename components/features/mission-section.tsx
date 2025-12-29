import { Heart, Target, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WORDS_RANGE } from "@/lib/constants/app-info-constants"

export const MissionSection = () => {
    return (
        <section className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto space-y-8">
                <Card className="border border-border">
                    <CardHeader>
                        <Target className="w-8 h-8 text-primary mb-3" />
                        <CardTitle className="text-2xl">Our Mission</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>ReadSpeed is dedicated to providing a free, accessible tool for anyone looking to:</p>
                        <ul className="list-disc list-inside space-y-2 ml-2">
                            <li>Measure their English reading speed accurately</li>
                            <li>Test comprehension across diverse topics</li>
                            <li>Track reading improvement over time</li>
                            <li>Build reading confidence with quality content</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="border border-border">
                    <CardHeader>
                        <Zap className="w-8 h-8 text-accent mb-3" />
                        <CardTitle className="text-2xl">How It Works</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <div>
                            <h3 className="font-semibold text-foreground mb-2">1. Start the Test</h3>
                            <p>Click the timer to begin reading a carefully selected {WORDS_RANGE} word passage.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-2">2. Read & Comprehend</h3>
                            <p>Read the passage at your natural pace. The timer counts from the moment you start.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-2">3. Answer Questions</h3>
                            <p>Answer 5 multiple-choice questions to verify your comprehension of the material.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-2">4. Get Your Score</h3>
                            <p>Receive your WPM (words-per-minute) and accuracy percentage with detailed breakdown.</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-border">
                    <CardHeader>
                        <Heart className="w-8 h-8 text-secondary mb-3" />
                        <CardTitle className="text-2xl">Reading Speed Formula</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <div className="bg-muted p-4 rounded-lg">
                            <p className="font-mono text-foreground mb-3">
                                <span className="font-semibold">WPM =</span> (Total Words ÷ Time in Minutes) × Accuracy Rate
                            </p>
                        </div>
                        <ul className="space-y-2 ml-2">
                            <li>
                                <strong>Total Words:</strong> Word count of the passage (typically {WORDS_RANGE})
                            </li>
                            <li>
                                <strong>Time in Minutes:</strong> Duration from when you start reading until you finish
                            </li>
                            <li>
                                <strong>Accuracy Rate:</strong> Percentage of questions answered correctly (0-100%)
                            </li>
                        </ul>
                        <p className="mt-4 text-sm">
                            The accuracy rate is factored into the final score to ensure that speed without comprehension is not
                            rewarded.
                        </p>
                    </CardContent>
                </Card>

                <Card className="border border-border bg-card">
                    <CardHeader>
                        <CardTitle className="text-2xl">Why Accuracy Matters</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>
                            True reading speed is not just about finishing quickly—it&prime;s about understanding what you read. Our
                            formula multiplies your WPM by your accuracy percentage to ensure:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-2">
                            <li>You&prime;re rewarded for both speed and comprehension</li>
                            <li>Skimming is discouraged in favor of meaningful reading</li>
                            <li>Your score reflects genuine reading ability</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
