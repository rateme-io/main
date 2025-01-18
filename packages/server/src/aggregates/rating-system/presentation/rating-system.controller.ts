import {
  Controller,
  Inject,
} from '@nestjs/common';
import {
  RatingSystemAbstractService,
  RatingSystemService,
} from '../domain';

@Controller('/rating-system')
export class RatingSystemController {
  constructor(
    @Inject(RatingSystemAbstractService)
    private readonly rating_systemService: RatingSystemService,
  ) {}

  // methods
}
