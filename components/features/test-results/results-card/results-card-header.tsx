import type { Results, WPMLevel } from "@/components/test-results";
import { Badge } from "@/components/ui/badge";
import { CardDescription, CardTitle } from "@/components/ui/card";

interface ResultsCardHeaderProps {
    results: Results;
    wpmLevel: WPMLevel;
}

export const ResultsCardHeader = (props: ResultsCardHeaderProps) => {
    const { results, wpmLevel } = props;

    return (
        <div className="flex items-center justify-between">
            <div>
                <CardTitle className="text-2xl">Your Results</CardTitle>
                <CardDescription>
                    {results.passage} • {new Date(results.timestamp).toLocaleDateString()}
                </CardDescription>
            </div>
            <Badge className={wpmLevel.color}>{wpmLevel.label}</Badge>
        </div>
    )
}
