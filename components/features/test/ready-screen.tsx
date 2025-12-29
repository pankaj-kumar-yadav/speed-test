import type { Passage } from "@/components/reading-test";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Play } from "lucide-react";

interface ReadyScreenProps {
    passage: Passage;
    handleStartReading: () => void;
}

export const ReadyScreen = (props: ReadyScreenProps) => {
    const { passage, handleStartReading } = props;

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
                            <li>Click &ldquo;Start Reading&rdquo; to begin. The timer will start immediately.</li>
                            <li>Read the passage below at your natural pace.</li>
                            <li>When done, click &ldquo;Finish Reading&rdquo; to proceed to comprehension questions.</li>
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
