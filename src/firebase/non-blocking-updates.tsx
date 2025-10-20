"use client";

import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

// These helpers now proxy writes to server-side HTTP endpoints (MongoDB).
// They intentionally do not await completion to keep the non-blocking behavior.

/**
 * Initiates a setDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function setDocumentNonBlocking(path: string, id: string | null, data: any) {
  // Example: POST /api/users or PUT /api/users/:uid
  const url = id ? `/api/${path}/${id}` : `/api/${path}`;
  const method = id ? 'PUT' : 'POST';
  fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    .catch((error) => {
      errorEmitter.emit(
        'permission-error',
        new FirestorePermissionError({
          path: url,
          operation: id ? 'update' : 'create',
          requestResourceData: data,
        })
      );
    });
}


/**
 * Initiates an addDoc operation for a collection reference.
 * Does NOT await the write operation internally.
 * Returns the Promise for the new doc ref, but typically not awaited by caller.
 */
export function addDocumentNonBlocking(path: string, data: any) {
  const url = `/api/${path}`;
  return fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    .catch((error) => {
      errorEmitter.emit(
        'permission-error',
        new FirestorePermissionError({
          path: url,
          operation: 'create',
          requestResourceData: data,
        })
      );
    });
}


/**
 * Initiates an updateDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function updateDocumentNonBlocking(path: string, id: string, data: any) {
  const url = `/api/${path}/${id}`;
  fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    .catch((error) => {
      errorEmitter.emit(
        'permission-error',
        new FirestorePermissionError({
          path: url,
          operation: 'update',
          requestResourceData: data,
        })
      );
    });
}


/**
 * Initiates a deleteDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function deleteDocumentNonBlocking(path: string, id: string) {
  const url = `/api/${path}/${id}`;
  fetch(url, { method: 'DELETE' }).catch((error) => {
    errorEmitter.emit(
      'permission-error',
      new FirestorePermissionError({
        path: url,
        operation: 'delete',
      })
    );
  });
}