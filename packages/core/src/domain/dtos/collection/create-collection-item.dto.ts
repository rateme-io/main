import { z } from 'zod';
import { NameVo } from '@/domain/value-objects/name.vo';
import { JsonVo } from '@/domain/value-objects/json.vo';

export const CreateCollectionItemDtoSchema = z.object({
  name: NameVo.schema,
  jsonFields: JsonVo.schema,
  collectionId: z.string(),
});

export type CreateCollectionItemDto = z.infer<typeof CreateCollectionItemDtoSchema>