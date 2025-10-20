import { CreditCard, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mx-auto max-w-2xl text-center">
        <Lock className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">
          Secure Checkout
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Our full checkout experience is currently under construction. We are working hard to bring you a seamless and secure payment process.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-border p-8">
            <CreditCard className="h-10 w-10 text-muted-foreground" />
            <p className="text-muted-foreground">This is where the secure payment form will be.</p>
        </div>
        <p className="mt-8 text-muted-foreground">Thank you for your patience.</p>
        <Button asChild className="mt-6">
          <Link href="/">
            Continue Shopping
          </Link>
        </Button>
      </div>
    </div>
  );
}
