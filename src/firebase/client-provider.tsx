'use client';

import {useEffect, useState, type PropsWithChildren} from 'react';
import {FirebaseProvider} from './provider';

/**
 * Provides a Firebase context to its children, ensuring that Firebase is only
 * initialized on the client side. This is crucial for frameworks like Next.js
 * that use Server-Side Rendering (SSR).
 *
 * The provider defers rendering of its children until the component has mounted
 * on the client, preventing Firebase from being initialized on the server.
 *
 * @param {PropsWithChildren} props The properties for the component, including children.
 * @returns {JSX.Element | null} The FirebaseProvider with children, or null if not mounted.
 */
export function FirebaseClientProvider({children}: PropsWithChildren) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Render children only after the component has mounted on the client.
  if (!isMounted) {
    return null;
  }

  return <FirebaseProvider>{children}</FirebaseProvider>;
}
