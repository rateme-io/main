import { z } from 'zod';
import { JsonVo } from '@/domain/value-objects/json.vo';

export const CreateRatingDtoSchema = z.object({
  collectionId: z.string(),
  ratingSystemId: z.string(),
  jsonRates: JsonVo.schema,
});

export type CreateRatingDto = z.input<typeof CreateRatingDtoSchema>;