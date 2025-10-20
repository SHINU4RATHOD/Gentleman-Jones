'use client';
import {useState, useEffect, useMemo} from 'react';
import {
  onSnapshot,
  collection,
  query,
  where,
  type DocumentData,
  type Firestore,
  type CollectionReference,
  type Query,
} from 'firebase/firestore';

import {useFirestore} from '@/firebase';
import {errorEmitter} from '@/firebase/error-emitter';
import {FirestorePermissionError} from '@/firebase/errors';

// Custom hook to memoize a Firestore query.
export function useMemoQuery(
  ...[firestore, path, ...queryConstraints]: Parameters<typeof query>
) {
  return useMemo(
    () => (firestore ? query(collection(firestore, path), ...queryConstraints) : null),
    [firestore, path, ...queryConstraints.map((c) => c.type)]
  );
}

// Custom hook to fetch a collection from Firestore.
export function useCollection<T extends DocumentData>(
  query: Query<T> | null,
  options?: {
    listen?: boolean;
  }
) {
  const listen = options?.listen ?? false;
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const firestore = useFirestore();

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }
    setLoading(true);

    const unsubscribe = onSnapshot(
      query,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as T[];
        setData(docs);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        const permissionError = new FirestorePermissionError({
          path: (query as CollectionReference).path,
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
      }
    );

    return () => unsubscribe();
  }, [query, listen]);

  return {data, loading};
}
