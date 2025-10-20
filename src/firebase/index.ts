'use client';
import {getApps, initializeApp, type FirebaseApp} from 'firebase/app';
import {getAuth, type Auth} from 'firebase/auth';
import {getFirestore, type Firestore} from 'firebase/firestore';

import {firebaseConfig} from '@/firebase/config';

export * from './provider';
export * from './auth/use-user';
export * from './firestore/use-collection';
export * from './firestore/use-doc';

// Initializes and returns a Firebase object with Auth and Firestore services.
export function initializeFirebase(): {
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
} {
  const firebaseApp =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  return {firebaseApp, auth, firestore};
}
