import {EventEmitter} from 'events';
import {FirestorePermissionError} from './errors';

// Defines the types of events that can be emitted.
interface ErrorEvents {
  'permission-error': (error: FirestorePermissionError) => void;
}

// Declares the interface for the ErrorEmitter.
export interface ErrorEmitter extends EventEmitter {
  on<T extends keyof ErrorEvents>(event: T, listener: ErrorEvents[T]): this;
  off<T extends keyof ErrorEvents>(event: T, listener: ErrorEvents[T]): this;
  emit<T extends keyof ErrorEvents>(
    event: T,
    ...args: Parameters<ErrorEvents[T]>
  ): boolean;
}

// Creates a new instance of the ErrorEmitter.
export const errorEmitter: ErrorEmitter = new EventEmitter();
