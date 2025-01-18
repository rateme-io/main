import { z } from 'zod';
import { NameVo } from '@/domain/value-objects/name.vo';

export const CreateCollectionDtoSchema = z.object({
  name: NameVo.schema,
  jsonSchema: z.record(z.any()),
});

export type CreateCollectionDto = z.infer<typeof CreateCollectionDtoSchema>