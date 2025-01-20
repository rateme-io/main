import { RatingEntity } from '@rateme/core/domain/entities/rating.entity';
import {
  CreateRatingCommand,
  CreateRatingSystemCommand,
  RatingSystemAbstractService,
} from '../domain';
import { RatingSystemEntity } from '@rateme/core/domain/entities/rating-system.entity';
import { JsonVo } from '@rateme/core/domain/value-objects/json.vo';
import { NameVo } from '@rateme/core/domain/value-objects/name.vo';
import { JsonSchemaService } from '@/core/modules/json-schema';
import { Inject, Injectable } from '@nestjs/common';
import { RatingSystemUnitOfWork } from './rating-system.unit-of-work';

@Injectable()
export class RatingSystemService extends RatingSystemAbstractService {
  constructor(
    @Inject(RatingSystemUnitOfWork)
    private readonly ratingSystemUnitOfWork: RatingSystemUnitOfWork,
    @Inject(JsonSchemaService)
    private readonly jsonSchemaService: JsonSchemaService,
  ) {
    super();
  }

  getRatingSystems(): Promise<RatingSystemEntity[]> {
    return this.ratingSystemUnitOfWork.start(
      async ({ ratingSystemRepository }) => {
        return await ratingSystemRepository.findAll();
      },
    );
  }

  createRatingSystem(
    command: CreateRatingSystemCommand,
  ): Promise<RatingSystemEntity> {
    return this.ratingSystemUnitOfWork.start(
      async ({ ratingSystemRepository }) => {
        const entity = RatingSystemEntity.create({
          userId: command.userId,
          version: 1,
          name: new NameVo(command.name),
          jsonSchema: new JsonVo(command.jsonSchema),
          jsonFormula: new JsonVo(command.jsonFormula),
        });

        await entity.validate();

        return await ratingSystemRepository.create(entity);
      },
    );
  }

  getRatings(): Promise<RatingEntity[]> {
    return this.ratingSystemUnitOfWork.start(async ({ ratingRepository }) => {
      return await ratingRepository.findAll();
    });
  }

  createRating(command: CreateRatingCommand): Promise<RatingEntity> {
    return this.ratingSystemUnitOfWork.start(
      async ({ ratingRepository, ratingSystemRepository }) => {
        const ratingSystem = await ratingSystemRepository.findById(
          command.ratingSystemId,
        );

        if (!ratingSystem) {
          throw new Error('Rating system not found');
        }

        const { isValid } = this.jsonSchemaService.validateData(
          ratingSystem.jsonFormula.getValue(),
          command.jsonRates,
        );

        if (!isValid) {
          throw new Error('Invalid json rates');
        }

        const entity = RatingEntity.create({
          userId: command.userId,
          ratingSystemId: command.ratingSystemId,
          collectionId: command.collectionId,
          jsonRates: new JsonVo(command.jsonRates),
        });

        await entity.validate();

        return await ratingRepository.create(entity);
      },
    );
  }
}
