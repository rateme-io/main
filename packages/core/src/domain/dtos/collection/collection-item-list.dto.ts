import { z } from 'zod';

export const CollectionItemResponseDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type CollectionItemResponseDto = z.infer<typeof CollectionItemResponseDtoSchema>

export const CollectionItemListResponseDtoSchema = z.object({
  list: z.array(CollectionItemResponseDtoSchema)
})

export type CollectionItemListResponseDto = z.infer<typeof CollectionItemListResponseDtoSchema>