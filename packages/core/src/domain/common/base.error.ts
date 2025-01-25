export class BaseError {
  constructor(
    public readonly message: string,
    public readonly type: string,
  ) {}
}
