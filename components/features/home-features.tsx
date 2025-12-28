import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { APP_NAME } from "@/lib/constants/app-info-constants"
import { BarChart3, BookOpen, Trophy } from "lucide-react"

export const HomeFeatures = () => {
    return (
        <section className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Why Test With {APP_NAME}?</h2>
            <div className="grid md:grid-cols-3 gap-6">
                <Card className="border border-border hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <BookOpen className="w-8 h-8 text-primary mb-3" />
                        <CardTitle>Curated Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Medium-difficulty passages from quality publications like Aeon, ensuring engaging and educational
                            content.
                        </p>
                    </CardContent>
                </Card>

                <Card className="border border-border hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <BarChart3 className="w-8 h-8 text-accent mb-3" />
                        <CardTitle>Accurate Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Professional WPM calculation with accuracy scoring based on your comprehension answers.
                        </p>
                    </CardContent>
                </Card>

                <Card className="border border-border hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <Trophy className="w-8 h-8 text-secondary mb-3" />
                        <CardTitle>Track Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Save your test results automatically and monitor your reading improvement over time.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
