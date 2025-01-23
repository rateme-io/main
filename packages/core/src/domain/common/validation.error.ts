import { ZodIssue } from 'zod';

export class ValidationError extends Error {
  constructor(public readonly errors: ZodIssue[]) {
    super();
    this.name = 'ValidationError';
  }
}
