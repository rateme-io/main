import { z } from 'zod';
import { NameVo } from '@/domain/value-objects/name.vo';

export const CreateCollectionItemDtoSchema = z.object({
  name: NameVo.schema,
  jsonFields: z.record(z.any()),
  collectionId: z.string(),
});

export type CreateCollectionItemDto = z.infer<typeof CreateCollectionItemDtoSchema>