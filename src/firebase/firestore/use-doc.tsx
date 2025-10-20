// src/firebase/firestore/use-doc.ts
'use client';
import {useState, useEffect, useMemo} from 'react';
import {
  onSnapshot,
  doc,
  type DocumentData,
  type DocumentReference,
} from 'firebase/firestore';

import {useFirestore} from '@/firebase';
import {errorEmitter} from '@/firebase/error-emitter';
import {FirestorePermissionError} from '@/firebase/errors';

export function useMemoDoc(
  ...[firestore, path, ...pathSegments]: Parameters<typeof doc>
) {
  return useMemo(
    () => (firestore ? doc(firestore, path, ...pathSegments) : null),
    [firestore, path, ...pathSegments]
  );
}

// Custom hook to fetch a single document from Firestore.
export function useDoc<T extends DocumentData>(
  ref: DocumentReference<T> | null,
  options?: {
    listen?: boolean;
  }
) {
  const listen = options?.listen ?? false;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ref) {
      setLoading(false);
      return;
    }
    setLoading(true);

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.exists()) {
          setData({id: snapshot.id, ...snapshot.data()} as T);
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        const permissionError = new FirestorePermissionError({
          path: ref.path,
          operation: 'get',
        });
        errorEmitter.emit('permission-error', permissionError);
      }
    );

    return () => unsubscribe();
  }, [ref, listen]);

  return {data, loading};
}
