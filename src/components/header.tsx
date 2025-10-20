'use client';

import Link from 'next/link';
import {
  ShoppingCart,
  User,
  Menu,
  Wind,
  LogOut,
  LogIn,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { useCart } from '@/contexts/cart-context';
import { CartSheet } from './cart-sheet';
import { useState } from 'react';
import { useUser, useAuth } from '@/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '#', label: 'Suits' },
  { href: '#', label: 'Shirts' },
  { href: '#', label: 'Shoes' },
  { href: '#', label: 'About' },
];

export function AppHeader() {
  const { itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, loading } = useUser();
  const auth = useAuth();

  const handleLogout = () => {
    auth.signOut();
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-foreground text-background shadow-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Wind className="h-7 w-7" />
              <span className="text-xl font-headline font-bold">
                Gentleman Jones
              </span>
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

            {!loading && (
              <div className="hidden md:block">
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-10 w-10 rounded-full hover:bg-background/20 p-0"
                      >
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={user.photoURL || ''}
                            alt={user.displayName || 'User'}
                          />
                          <AvatarFallback>
                            {getInitials(user.displayName)}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {user.displayName}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href="/login" passHref>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-background/20"
                    >
                      <User className="h-5 w-5" />
                      <span className="sr-only">User profile</span>
                    </Button>
                  </Link>
                )}
              </div>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden hover:bg-background/20"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="bg-background text-foreground"
              >
                <div className="flex flex-col gap-6 pt-10">
                  <SheetClose asChild>
                    <Link href="/" className="flex items-center gap-2 mb-4">
                      <Wind className="h-7 w-7" />
                      <span className="text-xl font-headline font-bold">
                        Gentleman Jones
                      </span>
                    </Link>
                  </SheetClose>
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href + link.label}>
                      <Link href={link.href} className="text-lg font-medium">
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                   <SheetClose asChild>
                    {user ? (
                      <button onClick={handleLogout} className="text-lg font-medium text-left flex items-center">
                        <LogOut className="mr-2 h-5 w-5" />
                        Logout
                      </button>
                    ) : (
                      <Link href="/login" className="text-lg font-medium flex items-center">
                         <LogIn className="mr-2 h-5 w-5" />
                        Login
                      </Link>
                    )}
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
