import { z } from 'zod';

export const CollectionResponseDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type CollectionResponseDto = z.infer<typeof CollectionResponseDtoSchema>

export const CollectionListResponseDtoSchema = z.object({
  list: z.array(CollectionResponseDtoSchema)
})

export type CollectionListResponseDto = z.infer<typeof CollectionListResponseDtoSchema>