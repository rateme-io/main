import { z } from 'zod';

import { NameVo } from '@/domain/value-objects/name.vo';

export const RatingSystemListItemResponseDtoSchema = z.object({
  id: z.string(),
  name: NameVo.schema,
  userId: z.string(),
  version: z.number(),
});

export type RatingSystemListItemResponseDto = z.infer<
  typeof RatingSystemListItemResponseDtoSchema
>;

export const RatingSystemListResponseDtoSchema = z.object({
  list: z.array(RatingSystemListItemResponseDtoSchema),
});

export type RatingSystemListResponseDto = z.infer<
  typeof RatingSystemListResponseDtoSchema
>;
