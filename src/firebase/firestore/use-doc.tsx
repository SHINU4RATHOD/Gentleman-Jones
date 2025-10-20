"use client";
import { useState, useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

// NOTE: Firestore real-time listeners replaced by REST endpoints.
export function useDoc<T = any>(path: string | null, id: string | null, options?: { listen?: boolean; intervalMs?: number }) {
  const listen = options?.listen ?? false;
  const intervalMs = options?.intervalMs ?? 3000;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!path || !id) {
      setLoading(false);
      return;
    }

    let mounted = true;

    const fetchOnce = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/${path}/${id}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const payload = await res.json();
        if (!mounted) return;
        setData(payload.user || payload);
      } catch (err: any) {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: `${path}/${id}`, operation: 'get' }));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchOnce();

    let timer: any;
    if (listen) timer = setInterval(fetchOnce, intervalMs);

    return () => {
      mounted = false;
      if (timer) clearInterval(timer);
    };
  }, [path, id, listen, intervalMs]);

  return { data, loading };
}
