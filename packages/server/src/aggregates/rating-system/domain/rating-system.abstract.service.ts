import { JsonInterface } from '@rateme/core/domain/common/json.interface';
import { RatingEntity } from '@rateme/core/domain/entities/rating.entity';
import { RatingSystemEntity } from '@rateme/core/domain/entities/rating-system.entity';

export abstract class RatingSystemAbstractService {
  abstract getRatingSystems(): Promise<RatingSystemEntity[]>;

  abstract createRatingSystem(
    command: CreateRatingSystemCommand,
  ): Promise<RatingSystemEntity>;

  abstract getRatings(): Promise<RatingEntity[]>;

  abstract createRating(command: CreateRatingCommand): Promise<RatingEntity>;
}

export interface CreateRatingSystemCommand {
  name: string;
  userId: string;
  jsonSchema: JsonInterface;
  jsonFormula: JsonInterface;
}

export interface CreateRatingCommand {
  collectionId: string;
  ratingSystemId: string;
  userId: string;
  jsonRates: JsonInterface;
}
