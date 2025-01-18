import { BaseError } from '@/core/error/error';

export class UserNotFound extends BaseError {
  constructor() {
    super('TokenAuthService', 'User not found');
  }
}

export class UserDoesntHavePassword extends BaseError {
  constructor() {
    super('TokenAuthService', 'User does not have password');
  }
}

export class InvalidPassword extends BaseError {
  constructor() {
    super('TokenAuthService', 'Invalid password');
  }
}

export class FailedToCreateSession extends BaseError {
  constructor() {
    super('TokenAuthService', 'Failed to create session');
  }
}

export class UserAlreadyExists extends BaseError {
  constructor() {
    super('TokenAuthService', 'User already exists');
  }
}
