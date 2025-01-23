import { z } from 'zod';

const schemas = new Map<unknown, Map<string, z.ZodTypeAny>>();

export function ZodValidator(schema: z.ZodTypeAny) {
  return function (target: object, propertyKey: string) {
    if (!schemas.has(target.constructor)) {
      schemas.set(target.constructor, new Map());
    }

    schemas.get(target.constructor)!.set(propertyKey, schema);
  };
}

export const validateClass = (instance: object) => {
  const map = schemas.get(instance.constructor);

  if (!map) {
    throw new Error('No schema found for class');
  }

  for (const [key, schema] of map) {
    const value = Reflect.get(instance, key);

    schema.parse(value);
  }
};
