import { z } from 'zod';

import { RatingEntity } from '@/domain/entities/rating.entity';
import { JsonVo } from '@/domain/value-objects/json.vo';

export class RatingDtoService {
  static schema = z.object({
    id: z.string(),
    userId: z.string(),
    collectionId: z.string(),
    ratingSystemId: z.string(),
    jsonRates: JsonVo.schema,
    createdAt: z.date(),
    updatedAt: z.date(),
  });

  static mapToDto(entity: RatingEntity): RatingDto {
    return {
      id: entity.id,
      userId: entity.userId,
      collectionId: entity.collectionId,
      ratingSystemId: entity.ratingSystemId,
      jsonRates: entity.jsonRates.getValue(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}

export type RatingDto = z.infer<typeof RatingDtoService.schema>;
