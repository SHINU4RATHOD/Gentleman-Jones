'use client';
import { useState, useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

// NOTE: Firestore real-time listeners have been replaced with REST endpoints backed by MongoDB.
// This hook performs a one-time fetch and optionally polls if `listen` is true.
export function useCollection<T = any>(path: string | null, options?: { listen?: boolean; intervalMs?: number }) {
  const listen = options?.listen ?? false;
  const intervalMs = options?.intervalMs ?? 3000;
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!path) {
      setLoading(false);
      return;
    }

    let mounted = true;
    const fetchOnce = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/${path}`);
        if (!res.ok) throw new Error(`Failed to fetch ${path}`);
        const payload = await res.json();
        if (!mounted) return;
        setData(payload.items || payload);
      } catch (err: any) {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path, operation: 'list' }));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchOnce();

    let timer: any;
    if (listen) {
      timer = setInterval(fetchOnce, intervalMs);
    }

    return () => {
      mounted = false;
      if (timer) clearInterval(timer);
    };
  }, [path, listen, intervalMs]);

  return { data, loading };
}
