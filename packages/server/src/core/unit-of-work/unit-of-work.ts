export abstract class UnitOfWork<Context> {
  abstract start<T>(callback: (context: Context) => Promise<T>): Promise<T>;
}
