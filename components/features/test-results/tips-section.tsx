import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export const TipsSection = () => {
    return (
        <Card className="border border-border bg-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    Tips to Improve Your Reading Speed
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                    <li>Minimize subvocalization (reading every word aloud in your mind)</li>
                    <li>Use peripheral vision to take in multiple words at once</li>
                    <li>Practice regularly with diverse texts and topics</li>
                    <li>Focus on understanding main ideas rather than individual words</li>
                    <li>Avoid regression (going back to re-read words or sentences)</li>
                </ul>
            </CardContent>
        </Card>
    )
}
