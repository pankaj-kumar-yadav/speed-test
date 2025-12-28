import { Button } from "@/components/ui/button"
import Link from "next/link"

export const CTASection2 = () => {
    return (
        <section className="container mx-auto px-4 py-16">
            <div className="bg-card border border-border rounded-lg p-8 md:p-12 text-center max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Ready to Test Your Reading Speed?</h2>
                <Link href="/test">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 cursor-pointer">
                        Start Test Now
                    </Button>
                </Link>
            </div>
        </section>
    )
}
