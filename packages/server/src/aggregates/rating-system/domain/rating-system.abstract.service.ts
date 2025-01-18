import { JsonInterface } from '@rateme/core/domain/common/json.interface';
import { RatingSystemEntity } from '@rateme/core/domain/entities/rating-system.entity';
import { RatingEntity } from '@rateme/core/domain/entities/rating.entity';

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
  jsonSchema: JsonInterface;
  jsonFormula: JsonInterface;
}

export interface CreateRatingCommand {
  ratingSystemId: string;
  userId: string;
  jsonRates: JsonInterface;
}
