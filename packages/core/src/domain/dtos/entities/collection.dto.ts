import { z } from 'zod';
import { NameVo } from '@/domain/value-objects/name.vo';
import { CollectionEntity } from '@/domain/entities/collection.entity';

export class CollectionDtoService {
  static schema = z.object({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    name: NameVo.schema,
    jsonSchema: z.record(z.any()),
    version: z.number(),
  });

  static mapToDto(entity: CollectionEntity): CollectionDto {
    return {
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      name: entity.name.getValue(),
      jsonSchema: entity.jsonSchema,
      version: entity.version,
    };
  }
}

export type CollectionDto = z.infer<typeof CollectionDtoService.schema>