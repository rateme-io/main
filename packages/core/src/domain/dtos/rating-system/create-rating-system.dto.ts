import { z } from 'zod';

import { JsonVo } from '@/domain/value-objects/json.vo';
import { NameVo } from '@/domain/value-objects/name.vo';

export const CreateRatingSystemDtoSchema = z.object({
  name: NameVo.schema,
  jsonFormula: JsonVo.schema,
  jsonSchema: JsonVo.schema,
});

export type CreateRatingSystemDto = z.input<typeof CreateRatingSystemDtoSchema>;
