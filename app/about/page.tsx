"use client"

import { CTASection2 } from "@/components/features/cta-section-2"
import { MissionSection } from "@/components/features/mission-section"
import { APP_NAME } from "@/lib/constants/app-info-constants"

export default function AboutPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6 text-foreground">About {APP_NAME}</h1>
                    <p className="text-lg text-muted-foreground text-balance">
                        Our mission is to help English learners and readers measure and improve their reading speed through
                        scientifically designed assessments.
                    </p>
                </div>
            </section>

            <MissionSection />

            <CTASection2 />
        </>
    )
}
