import { BaseError } from '@/domain/common/base.error';

export const wrongCredentialsError = new BaseError(
  'Wrong credentials',
  'WRONG_CREDENTIALS',
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
