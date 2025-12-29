import type { Passage } from "@/components/reading-test";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatTimeForTimeElapsed } from "@/lib/utils/test-results-utils";

interface ReadingScreenProps {
    passage: Passage;
    timeElapsed: number;
    handleFinishReading: () => void;
}

export const ReadingScreen = (props: ReadingScreenProps) => {
    const { passage, timeElapsed, handleFinishReading } = props;

    return (
        <div className="max-w-3xl mx-auto">
            <Card className="border border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Reading Passage</CardTitle>
                        <CardDescription>Read at your natural pace</CardDescription>
                    </div>
                    <div className="text-3xl font-mono font-bold text-primary">{formatTimeForTimeElapsed(timeElapsed)}</div>
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
