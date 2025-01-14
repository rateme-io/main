import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  InternalServerErrorException,
  Ip,
  Post,
  UnauthorizedException,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import {
  TokenRegisterDto,
  TokenRegisterDtoSchema,
} from '@rateme/core/domain/dtos/token-auth/token-register.dto';
import {
  TokenRefreshDto,
  TokenRefreshDtoSchema,
} from '@rateme/core/domain/dtos/token-auth/token-refresh.dto';
import { ZodValidationPipe } from '@/core/pipes';
import {
  TokenLoginDto,
  TokenLoginDtoSchema,
} from '@rateme/core/domain/dtos/token-auth/token-login.dto';
import { TokenDtoService } from '@rateme/core/domain/dtos/token-auth/token.dto';
import { UserDtoService } from '@rateme/core/domain/dtos/entities/user.dto';
import { TokenSessionDto } from '@rateme/core/domain/dtos/token-auth/token-session.dto';
import { SessionDtoService } from '@rateme/core/domain/dtos/entities/session.dto';
import { TokenAuthAbstractService } from '@/entities/token-auth/domain/token-auth.abstract.service';
import {
  FailedToCreateSession,
  InvalidPassword,
  TokenAuthService,
  UserAlreadyExists,
  UserNotFound,
} from '@/entities/token-auth/domain';
import { AuthGuard } from '@/core/guards/auth.guard';

@Controller('/auth/token')
export class TokenAuthController {
  constructor(
    @Inject(TokenAuthAbstractService)
    private readonly tokenAuthService: TokenAuthService,
  ) {}

  @UsePipes(new ZodValidationPipe(TokenLoginDtoSchema))
  @Post('/login')
  async login(
    @Body() body: TokenLoginDto,
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
  ): Promise<TokenSessionDto> {
    try {
      const { token } = await this.tokenAuthService.login({
        email: body.email,
        password: body.password,
        ipAddress,
        userAgent: userAgent ?? null,
      });

      return {
        token: TokenDtoService.mapToDto(token),
        user: UserDtoService.mapToDto(token.session.user),
        session: SessionDtoService.mapToDto(token.session),
      };
    } catch (error) {
      if (
        error instanceof UserNotFound ||
        error instanceof InvalidPassword ||
        error instanceof FailedToCreateSession
      ) {
        throw new UnauthorizedException('Invalid email or password');
      }

      throw new InternalServerErrorException();
    }
  }

  @UsePipes(new ZodValidationPipe(TokenRegisterDtoSchema))
  @Post('/register')
  async register(
    @Body()
    body: TokenRegisterDto,
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
  ): Promise<TokenSessionDto> {
    try {
      const { token } = await this.tokenAuthService.register({
        email: body.email,
        password: body.password,
        name: body.name,
        username: body.username,
        userAgent: userAgent ?? null,
        ipAddress,
      });

      return {
        token: TokenDtoService.mapToDto(token),
        user: UserDtoService.mapToDto(token.session.user),
        session: SessionDtoService.mapToDto(token.session),
      };
    } catch (error) {
      if (
        error instanceof UserAlreadyExists ||
        error instanceof FailedToCreateSession
      ) {
        throw new UnauthorizedException(
          'Cannot create user with this credentials',
        );
      }

      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(TokenRefreshDtoSchema))
  @Post('/refresh')
  async refresh(@Body() body: TokenRefreshDto): Promise<TokenSessionDto> {
    try {
      const { token } = await this.tokenAuthService.refresh({
        refreshToken: body.refreshToken,
      });

      return {
        token: TokenDtoService.mapToDto(token),
        user: UserDtoService.mapToDto(token.session.user),
        session: SessionDtoService.mapToDto(token.session),
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  async me() {
    return 'Hello';
  }
}
