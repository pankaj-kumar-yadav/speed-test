import { APP_NAME } from '@/lib/constants/app-info-constants';

export const Footer = () => {
    const getCurrentYear = new Date().getFullYear();
    return (
        <footer className="border-t border-border mt-16">
            <div className="container mx-auto px-4 py-8 text-center text-muted-foreground text-sm">
                <p>{APP_NAME} © {getCurrentYear}. Test your reading speed with scientifically designed passages.</p>
            </div>
        </footer>
    )
}