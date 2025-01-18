export class BaseError extends Error {
  constructor(
    private readonly scope: string,
    message: string,
  ) {
    super(message);
  }
}
