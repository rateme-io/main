import { ZodSchema } from 'zod';

export abstract class BaseValueObject<Value> {
  protected constructor(private readonly value: Value, private readonly schema: ZodSchema) {
  }

  getValue(): Value {
    return this.value;
  }

  validate() {
    this.schema.parse(this.value);
  }
}