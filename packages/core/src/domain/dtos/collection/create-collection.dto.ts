import { z } from 'zod';

import { JsonVo } from '@/domain/value-objects/json.vo';
import { NameVo } from '@/domain/value-objects/name.vo';

export const CreateCollectionDtoSchema = z.object({
  name: NameVo.schema,
  jsonSchema: JsonVo.schema,
});

export type CreateCollectionDto = z.infer<typeof CreateCollectionDtoSchema>;
