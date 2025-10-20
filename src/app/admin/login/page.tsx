'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Lock } from 'lucide-react';
import { useAuth } from '@/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
// Firestore removed; database calls are proxied to /api endpoints

export default function AdminLoginPage() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleCreateAdmin = async (email: string, adminPassword: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        adminPassword
      );
      const user = userCredential.user;
      // Create user in MongoDB via API
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user.uid, email: user.email, displayName: 'Admin', roles: ['admin'] }),
      });
      toast({
        title: 'Admin Account Created',
        description: 'Welcome, Admin! Your account has been set up.',
      });
      router.push('/admin');
    } catch (creationError: any) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description:
          creationError.message || 'Could not create admin user.',
      });
    }
  };


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const email = 'admin@example.com';
    const adminPassword = 'password';

    if (username !== 'admin' || password !== adminPassword) {
      toast({
        variant: 'destructive',
        title: 'Invalid Credentials',
        description: 'Please use the default admin credentials to log in.',
      });
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        adminPassword
      );
      const user = userCredential.user;

      // Read user from MongoDB via API
      const res = await fetch(`/api/users/${user.uid}`);
      const payload = await res.json();
      const userDoc = payload.user;

      if (userDoc && userDoc.roles?.includes('admin')) {
        toast({
          title: 'Admin Login Successful',
          description: 'Welcome back, Admin!',
        });
        router.push('/admin');
      } else {
        await fetch(`/api/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uid: user.uid, email: user.email, roles: ['admin'] }),
        });
        toast({
          title: 'Admin privileges granted',
          description: 'Admin role assigned. Logging in...',
        });
        router.push('/admin');
      }
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        // If user doesn't exist, create them
        await handleCreateAdmin(email, adminPassword);
      } else if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        // This is the key fix: if credentials are bad, it implies the user exists
        // but with a wrong password. We sign out any lingering state and recreate.
        // NOTE: This is a simplified dev-only solution. In production, you'd want a proper password reset flow.
        await auth.signOut(); // Clear any partial auth state
        await handleCreateAdmin(email, adminPassword); // Re-create the user
      } else {
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description:
            error.message || 'An unexpected error occurred. Please try again.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] bg-background px-4 py-12">
      <Card className="mx-auto max-w-sm w-full shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <Input
                    id="username"
                    type="text"
                    placeholder="admin"
                    required
                    className="pl-10"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="password"
                    required
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <Button type="submit" className="w-full mt-2" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
