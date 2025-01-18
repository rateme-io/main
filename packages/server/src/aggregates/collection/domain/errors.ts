import { BaseError } from '@/core/error/error';

export class InvalidJsonSchemaError extends BaseError {
  constructor() {
    super('CollectionService', 'Invalid JSON schema');
  }
}

export class FailedToCreateCollectionError extends BaseError {
  constructor() {
    super('CollectionService', 'Failed to create collection');
  }
}

export class CollectionNotFoundError extends BaseError {
  constructor() {
    super('CollectionService', 'Collection not found');
  }
}

export class InvalidJsonFieldsError extends BaseError {
  constructor() {
    super('CollectionService', 'Invalid JSON fields');
  }
}
