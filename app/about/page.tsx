"use client"

import { HeroSectionAbout } from "@/components/features/about/hero-section-about"
import { CTASection2 } from "@/components/features/cta-section-2"
import { MissionSection } from "@/components/features/mission-section"

export default function AboutPage() {
    return (
        <>
            <HeroSectionAbout />

            <MissionSection />

            <CTASection2 />
        </>
    )
}
