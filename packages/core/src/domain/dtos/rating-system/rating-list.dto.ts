import { z } from 'zod';

export const RatingListItemResponseDtoSchema = z.object({
  id: z.string(),
  userId: z.string(),
  collectionId: z.string(),
  ratingSystemId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type RatingListItemResponseDto = z.infer<typeof RatingListItemResponseDtoSchema>


export const RatingListResponseDtoSchema = z.object({
  list: z.array(RatingListItemResponseDtoSchema),
});

export type RatingListResponseDto = z.infer<typeof RatingListResponseDtoSchema>
