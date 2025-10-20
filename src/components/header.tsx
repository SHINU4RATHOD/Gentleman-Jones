"use client";

import Link from "next/link";
import { ShoppingCart, User, Menu, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useCart } from "@/contexts/cart-context";
import { CartSheet } from "./cart-sheet";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#", label: "Suits" },
  { href: "#", label: "Shirts" },
  { href: "#", label: "Shoes" },
  { href: "#", label: "About" },
];

export function AppHeader() {
  const { itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-foreground text-background shadow-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Wind className="h-7 w-7" />
              <span className="text-xl font-headline font-bold">Gentleman Jones</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="text-sm font-medium text-background/80 transition-colors hover:text-background"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-background/20"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </Button>
            <Link href="/login" passHref>
              <Button variant="ghost" size="icon" className="hidden md:inline-flex hover:bg-background/20">
                <User className="h-5 w-5" />
                <span className="sr-only">User profile</span>
              </Button>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden hover:bg-background/20">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-background text-foreground">
                <div className="flex flex-col gap-6 pt-10">
                    <SheetClose asChild>
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <Wind className="h-7 w-7" />
                            <span className="text-xl font-headline font-bold">Gentleman Jones</span>
                        </Link>
                    </SheetClose>
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-lg font-medium"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                   <SheetClose asChild>
                    <Link href="/login" className="text-lg font-medium">Login</Link>
                   </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
}
