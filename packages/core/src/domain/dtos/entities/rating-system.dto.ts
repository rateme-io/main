import { z } from 'zod';

import { RatingSystemEntity } from '@/domain/entities/rating-system.entity';
import { JsonVo } from '@/domain/value-objects/json.vo';
import { NameVo } from '@/domain/value-objects/name.vo';

export class RatingSystemDtoService {
  static schema = z.object({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    name: NameVo.schema,
    jsonFormula: JsonVo.schema,
    jsonSchema: JsonVo.schema,
    userId: z.string(),
    version: z.number(),
  });

  static mapToDto(entity: RatingSystemEntity): RatingSystemDto {
    return {
      name: entity.name.getValue(),
      jsonFormula: entity.jsonFormula.getValue(),
      jsonSchema: entity.jsonSchema.getValue(),
      userId: entity.userId,
      version: entity.version,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      id: entity.id,
    };
  }
}

export type RatingSystemDto = z.input<typeof RatingSystemDtoService.schema>;
