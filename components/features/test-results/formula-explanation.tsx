import type { Results } from "@/components/test-results";
import { Info } from "lucide-react";

interface FormulaExplanationProps {
    results: Results;
}

export const FormulaExplanation = (props: FormulaExplanationProps) => {
    const { results } = props;
    
    return (
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
    )
}
