import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export const AllAnswered = () => {
    return (
        <Card className="border border-destructive bg-destructive/5">
            <CardContent className="pt-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">Please answer all questions before submitting.</p>
            </CardContent>
        </Card>
    )
}
