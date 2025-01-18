import { z } from 'zod';
import { CollectionItemEntity } from '@/domain/entities/collection-item.entity';
import { JsonVo } from '@/domain/value-objects/json.vo';

export class CollectionItemDtoService {
  static schema = z.object({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    name: z.string(),
    jsonFields: JsonVo.schema,
    collectionId: z.string(),
  })

  static mapToDto(entity: CollectionItemEntity): CollectionItemDto {
    return {
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      name: entity.name.getValue(),
      jsonFields: entity.jsonFields,
      collectionId: entity.collectionId,
    }
  }
}

export type CollectionItemDto = z.infer<typeof CollectionItemDtoService.schema>