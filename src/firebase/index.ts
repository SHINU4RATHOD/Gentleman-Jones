'use client';
import {getApps, initializeApp, type FirebaseApp} from 'firebase/app';
import {getAuth, type Auth} from 'firebase/auth';
// Firestore removed (migrated to MongoDB). Keep Auth.

import {firebaseConfig} from '@/firebase/config';

export * from './provider';
export * from './auth/use-user';
export * from './firestore/use-collection';
export * from './firestore/use-doc';

// Initializes and returns a Firebase object with Auth and Firestore services.
export function initializeFirebase(): {
  firebaseApp: FirebaseApp;
  auth: Auth;
  // firestore: Firestore | null;
} {
  const firebaseApp =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

  const auth = getAuth(firebaseApp);
  // Firestore is intentionally not initialized. Use MongoDB for database.

  return {firebaseApp, auth};
}
