import { z } from 'zod';
import { NameVo } from '@/domain/value-objects/name.vo';
import { JsonVo } from '@/domain/value-objects/json.vo';

export const CreateRatingSystemDtoSchema = z.object({
  name: NameVo.schema,
  jsonFormula: JsonVo.schema,
  jsonSchema: JsonVo.schema,
})

export type CreateRatingSystemDto = z.input<typeof CreateRatingSystemDtoSchema>;