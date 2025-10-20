'use client';
import {useEffect} from 'react';

import {errorEmitter} from '@/firebase/error-emitter';
import {FirestorePermissionError} from '@/firebase/errors';

/**
 * Listens for Firebase permission errors and throws them as uncaught exceptions.
 * This is useful for development environments to display a Next.js error overlay.
 * The component does not render any UI and is only active in development.
 */
export function FirebaseErrorListener() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const handleError = (error: FirestorePermissionError) => {
      // Throwing the error here will cause it to be caught by the Next.js
      // error overlay in development, making it highly visible.
      throw error;
    };

    errorEmitter.on('permission-error', handleError);

    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, []);

  return null;
}
