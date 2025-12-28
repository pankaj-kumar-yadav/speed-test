import type { Results } from "@/components/test-results";
import { formatTime } from "@/lib/utils/test-results-utils";

interface WPMDisplayProps {
    results: Results;
}

export const WPMDisplay = (props: WPMDisplayProps) => {
    const { results } = props;

    return (
        <div className="text-center space-y-2">
            <div className="text-6xl font-bold text-primary mb-2">{results.wpm}</div>
            <p className="text-xl text-muted-foreground">Words Per Minute</p>
            <p className="text-sm text-muted-foreground">
                Based on {results.wordCount} words read in {formatTime(results.timeElapsed)}
            </p>
        </div>
    )
}
