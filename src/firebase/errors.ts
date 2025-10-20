'use client';

// Defines the context for a security rule violation.
export type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  requestResourceData?: any;
};

// Base class for custom Firebase errors.
class FirebaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

/**
 * Custom error for Firestore permission issues.
 * This error is thrown when a Firestore operation fails due to security rules.
 * It includes detailed context to help developers debug permission errors.
 */
export class FirestorePermissionError extends FirebaseError {
  context: SecurityRuleContext;

  constructor(context: SecurityRuleContext) {
    const message = `FirestoreError: Missing or insufficient permissions: The following request was denied by Firestore Security Rules:\n${JSON.stringify(context, null, 2)}`;
    super(message);
    this.context = context;
    this.name = 'FirestorePermissionError';
  }
}
