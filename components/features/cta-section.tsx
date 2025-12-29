import { Button } from "@/components/ui/button"
import { WORDS_RANGE } from "@/lib/constants/app-info-constants"
import Link from "next/link"

export const CTASection = () => {
    return (
        <section className="container mx-auto px-4 py-16 text-center">
            <div className="bg-card border border-border rounded-lg p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">Ready to Test Your Reading Speed?</h2>
                <p className="text-muted-foreground mb-6 text-balance">
                    Complete a {WORDS_RANGE} word passage and answer 5 comprehension questions to get your personalized WPM score.
                </p>
                <Link href="/test">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                        Start Reading Test Now
                    </Button>
                </Link>
            </div>
        </section>
    )
}
