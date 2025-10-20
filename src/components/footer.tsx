import Link from 'next/link';
import { Wind, Twitter, Instagram, Facebook } from 'lucide-react';

export function AppFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Wind className="h-7 w-7" />
              <span className="text-xl font-headline font-bold">Gentleman Jones</span>
            </Link>
            <p className="text-sm text-center md:text-left text-background/70 max-w-xs">
              Crafting timeless style for the modern man since 2024.
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-background/70 hover:text-background">About Us</Link></li>
              <li><Link href="#" className="text-sm text-background/70 hover:text-background">Contact</Link></li>
              <li><Link href="#" className="text-sm text-background/70 hover:text-background">FAQ</Link></li>
              <li><Link href="/admin/login" className="text-sm text-background/70 hover:text-background">Admin</Link></li>
            </ul>
          </div>
          <div className="text-center md:text-right">
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-end gap-4">
              <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 text-background/70 hover:text-background" /></Link>
              <Link href="#" aria-label="Instagram"><Instagram className="h-5 w-5 text-background/70 hover:text-background" /></Link>
              <Link href="#" aria-label="Facebook"><Facebook className="h-5 w-5 text-background/70 hover:text-background" /></Link>
            </div>
          </div>
        </div>
        <div className="border-t border-background/20 mt-8 pt-6 text-center text-sm text-background/50">
          <p>&copy; {new Date().getFullYear()} Gentleman Jones. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
