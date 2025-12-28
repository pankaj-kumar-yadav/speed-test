import { Button } from "@/components/ui/button"
import { APP_NAME } from "@/lib/constants/app-info-constants"
import { BookOpen } from "lucide-react"
import Link from "next/link"

export const Navbar = () => {
    return (
        <nav className="border-b border-border">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-primary" />
                    <span className="text-xl font-bold text-foreground">{APP_NAME}</span>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <Button variant="ghost">Home</Button>
                    </Link>
                    <Link href="/about">
                        <Button variant="ghost">About</Button>
                    </Link>
                    <Link href="/test">
                        <Button className="bg-primary hover:bg-primary/90 cursor-pointer">Start Test</Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
