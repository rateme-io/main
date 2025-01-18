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
import { CollectionAbstractService, CollectionService } from '../domain';
import { ZodValidationPipe } from '@/core/pipes';
import {
  CreateCollectionDto,
  CreateCollectionDtoSchema,
} from '@rateme/core/domain/dtos/collection/create-collection.dto';
import {
  CreateCollectionItemDto,
  CreateCollectionItemDtoSchema,
} from '@rateme/core/domain/dtos/collection/create-collection-item.dto';
import { CollectionListResponseDto } from '@rateme/core/domain/dtos/collection/collection-list.dto';
import { CollectionItemListResponseDto } from '@rateme/core/domain/dtos/collection/collection-item-list.dto';
import {
  CollectionDto,
  CollectionDtoService,
} from '@rateme/core/domain/dtos/entities/collection.dto';
import {
  CollectionItemDto,
  CollectionItemDtoService,
} from '@rateme/core/domain/dtos/entities/collection-item.dto';
import { Request } from 'express';
import { AuthGuard, AuthService } from '@/core/modules/auth';

@Controller('/collection')
export class CollectionController {
  constructor(
    @Inject(CollectionAbstractService)
    private readonly collectionService: CollectionService,
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/list')
  async list(): Promise<CollectionListResponseDto> {
    try {
      const collections = await this.collectionService.getCollections();

      return {
        list: collections.map((collection) => ({
          name: collection.name.getValue(),
          id: collection.id,
        })),
      };
    } catch (error) {
      throw error;
    }
  }

  @UsePipes(new ZodValidationPipe(CreateCollectionDtoSchema))
  @UseGuards(AuthGuard)
  @Post('/create')
  async create(
    @Body() body: CreateCollectionDto,
    @Req() request: Request,
  ): Promise<CollectionDto> {
    try {
      const session = await this.authService.getSession(request);

      const collection = await this.collectionService.createCollection({
        user: session.user,
        name: body.name,
        jsonSchema: body.jsonSchema,
      });

      return CollectionDtoService.mapToDto(collection);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Get('/item/list')
  async itemList(
    @Req() request: Request,
  ): Promise<CollectionItemListResponseDto> {
    try {
      const session = await this.authService.getSession(request);

      const collectionItems = await this.collectionService.getCollectionItems({
        user: session.user,
        collectionId: request.query.collectionId as string,
      });

      return {
        list: collectionItems.map((collectionItem) => ({
          name: collectionItem.name.getValue(),
          id: collectionItem.id,
        })),
      };
    } catch (error) {
      throw error;
    }
  }

  @UsePipes(new ZodValidationPipe(CreateCollectionItemDtoSchema))
  @UseGuards(AuthGuard)
  @Post('/item/create')
  async createItem(
    @Body() body: CreateCollectionItemDto,
    @Req() request: Request,
  ): Promise<CollectionItemDto> {
    try {
      const session = await this.authService.getSession(request);

      const collectionItem = await this.collectionService.createCollectionItem({
        user: session.user,
        name: body.name,
        jsonFields: body.jsonFields,
        collectionId: body.collectionId,
      });

      return CollectionItemDtoService.mapToDto(collectionItem);
    } catch (error) {
      throw error;
    }
  }
}
