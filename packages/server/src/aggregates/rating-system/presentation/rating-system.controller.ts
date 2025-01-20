import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { RatingSystemAbstractService } from '../domain';
import { AuthGuard, AuthService } from '@/core/modules/auth';
import { Request } from 'express';
import { ZodValidationPipe } from '@/core/pipes';
import {
  CreateRatingSystemDto,
  CreateRatingSystemDtoSchema,
} from '@rateme/core/domain/dtos/rating-system/create-rating-system.dto';
import {
  RatingSystemDto,
  RatingSystemDtoService,
} from '@rateme/core/domain/dtos/entities/rating-system.dto';
import {
  CreateRatingDtoSchema,
  CreateRatingDto,
} from '@rateme/core/domain/dtos/rating-system/create-rating.dto';
import { RatingDtoService } from '@rateme/core/domain/dtos/entities/rating.dto';
import { RatingSystemListResponseDto } from '@rateme/core/domain/dtos/rating-system/rating-system-list.dto';
import { RatingListResponseDto } from '@rateme/core/domain/dtos/rating-system/rating-list.dto';

@Controller('/rating-system')
export class RatingSystemController {
  constructor(
    @Inject(RatingSystemAbstractService)
    private readonly ratingSystemService: RatingSystemAbstractService,
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/list')
  async list(): Promise<RatingSystemListResponseDto> {
    try {
      const ratingSystems = await this.ratingSystemService.getRatingSystems();

      return {
        list: ratingSystems.map((ratingSystem) => ({
          id: ratingSystem.id,
          name: ratingSystem.name.getValue(),
          userId: ratingSystem.userId,
          version: ratingSystem.version,
        })),
      };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(CreateRatingSystemDtoSchema))
  @Post('/create')
  async create(
    @Req() request: Request,
    @Body() body: CreateRatingSystemDto,
  ): Promise<RatingSystemDto> {
    try {
      const session = await this.authService.getSession(request);

      const ratingSystem = await this.ratingSystemService.createRatingSystem({
        userId: session.user.id,
        name: body.name,
        jsonFormula: body.jsonFormula,
        jsonSchema: body.jsonSchema,
      });

      return RatingSystemDtoService.mapToDto(ratingSystem);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Get('/item/list')
  async itemList(): Promise<RatingListResponseDto> {
    try {
      const ratings = await this.ratingSystemService.getRatings();

      return {
        list: ratings.map((rating) => ({
          id: rating.id,
          userId: rating.userId,
          collectionId: rating.collectionId,
          ratingSystemId: rating.ratingSystemId,
          createdAt: rating.createdAt,
          updatedAt: rating.updatedAt,
        })),
      };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(CreateRatingDtoSchema))
  @Post('/item/create')
  async createItem(@Req() request: Request, @Body() body: CreateRatingDto) {
    try {
      const session = await this.authService.getSession(request);

      const rating = await this.ratingSystemService.createRating({
        userId: session.user.id,
        collectionId: body.collectionId,
        ratingSystemId: body.ratingSystemId,
        jsonRates: body.jsonRates,
      });

      return RatingDtoService.mapToDto(rating);
    } catch (error) {
      throw error;
    }
  }
}
