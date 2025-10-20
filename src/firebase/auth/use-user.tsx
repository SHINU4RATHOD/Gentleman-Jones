'use client';
import {useEffect, useState} from 'react';
import {type User, onIdTokenChanged} from 'firebase/auth';

import {useAuth} from '@/firebase/provider';

/**
 * React hook that provides the current authenticated user.
 * It listens for changes in the user's authentication state and automatically
 * updates the component when the user logs in or out.
 *
 * @returns {{user: User | null, loading: boolean}} An object containing the
 *   current user and a loading state. `user` is null if no user is logged in.
 *   `loading` is true while the initial authentication state is being determined.
 */
export function useUser() {
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return {user, loading};
}
