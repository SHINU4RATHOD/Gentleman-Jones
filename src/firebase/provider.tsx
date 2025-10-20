'use client';
import {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from 'react';
import type {FirebaseApp} from 'firebase/app';
import type {Auth} from 'firebase/auth';
// Firestore removed - migrated to MongoDB

import {initializeFirebase} from '@/firebase';
import {FirebaseErrorListener} from '@/components/FirebaseErrorListener';

// Define the shape of the Firebase context.
export interface FirebaseContextValue {
  firebaseApp: FirebaseApp;
  auth: Auth;
  // firestore removed: use MongoDB APIs via server-side routes
}

// Create the Firebase context.
export const FirebaseContext = createContext<FirebaseContextValue | null>(
  null
);

/**
 * Provides a Firebase context to its children.
 * This provider initializes Firebase and makes the Firebase app, Auth, and Firestore
 * instances available to all descendants.
 *
 * @param {PropsWithChildren} props The properties for the component.
 * @returns {JSX.Element} The provider component.
 */
export function FirebaseProvider({children}: PropsWithChildren) {
  const {firebaseApp, auth} = useMemo(() => initializeFirebase(), []);

  const contextValue = useMemo(
    () => ({
      firebaseApp,
      auth,
    }),
    [firebaseApp, auth]
  );

  return (
    <FirebaseContext.Provider value={contextValue}>
      <FirebaseErrorListener />
      {children}
    </FirebaseContext.Provider>
  );
}

/**
 * Hook to get the Firebase context value.
 * Throws an error if used outside of a FirebaseProvider.
 *
 * @returns {FirebaseContextValue} The Firebase context.
 */
export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider.');
  }
  return context;
}

/**
 * Hook to get the Firebase app instance.
 * @returns {FirebaseApp} The Firebase app instance.
 */
export function useFirebaseApp() {
  return useFirebase().firebaseApp;
}

/**
 * Hook to get the Firebase Auth instance.
 * @returns {Auth} The Firebase Auth instance.
 */
export function useAuth() {
  return useFirebase().auth;
}

/**
 * Hook to get the Firestore instance.
 * @returns {Firestore} The Firestore instance.
 */
export function useFirestore() {
  // Deprecated: Firestore is no longer used. Return null to keep compatibility
  return null as any;
}
