import type { Results } from "@/components/test-results";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatTime } from "@/lib/utils/test-results-utils";

interface MetricsCardProps {
    results: Results;
}

export const MetricsCard = (props: MetricsCardProps) => {
    const { results } = props;

    return (
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
    )
}
