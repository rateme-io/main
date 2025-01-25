import { BaseError } from '@/domain/common/base.error';

export const userNotFoundError = new BaseError(
  'User not found',
  'USER_NOT_FOUND',
);

export const wrongCredentialsError = new BaseError(
  'Wrong credentials',
  'WRONG_CREDENTIALS',
);

export const userAlreadyExistsError = new BaseError(
  'User already exists',
  'USER_ALREADY_EXISTS',
);

export const sessionNotFoundError = new BaseError(
  'Session not found',
  'SESSION_NOT_FOUND',
);

export const tokenNotFoundError = new BaseError(
  'Token not found',
  'TOKEN_NOT_FOUND',
);

export const invalidTokenError = new BaseError(
  'Invalid token',
  'INVALID_TOKEN',
);

export const tokenExpiredError = new BaseError(
  'Token expired',
  'TOKEN_EXPIRED',
);
