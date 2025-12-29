import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layout/navbar/navbar"
import { Footer } from "@/components/layout/footer/footer"
import { APP_NAME } from "@/lib/constants/app-info-constants"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: `${APP_NAME} - English Reading Speed Test`,
  description:
    "Test and improve your English reading speed with our scientifically designed reading comprehension test.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
          <Navbar />
          <div className="lg:px-16">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
