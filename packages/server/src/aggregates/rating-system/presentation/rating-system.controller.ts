import { Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { RatingSystemAbstractService } from '../domain';
import { AuthGuard } from '@/core/modules/auth';

@Controller('/rating-system')
export class RatingSystemController {
  constructor(
    @Inject(RatingSystemAbstractService)
    private readonly ratingSystemService: RatingSystemAbstractService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/list')
  async list() {
    try {
      const ratingSystems = await this.ratingSystemService.getRatingSystems();

      return ratingSystems;
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Post('/create')
  async create() {
    throw new Error('Not implemented');
  }

  @UseGuards(AuthGuard)
  @Get('/item/list')
  async itemList() {
    try {
      const ratings = await this.ratingSystemService.getRatings();

      return ratings;
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Post('/item/create')
  async createItem() {
    throw new Error('Not implemented');
  }
}
