import { z } from 'zod';

import { JsonVo } from '@/domain/value-objects/json.vo';
import { NameVo } from '@/domain/value-objects/name.vo';

export const CreateCollectionItemDtoSchema = z.object({
  name: NameVo.schema,
  jsonFields: JsonVo.schema,
  collectionId: z.string(),
});

export type CreateCollectionItemDto = z.infer<
  typeof CreateCollectionItemDtoSchema
>;
