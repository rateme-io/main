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
import { UserDtoService } from '@rateme/core/domain/dtos/entities/user.dto';
import { TokenSessionDto } from '@rateme/core/domain/dtos/token-auth/token-session.dto';
import { SessionDtoService } from '@rateme/core/domain/dtos/entities/session.dto';

import { AuthGuard } from '@/core/guards/auth.guard';
import {
  FailedToCreateSession,
  InvalidPassword,
  TokenAuthAbstractService,
  TokenAuthService,
  UserAlreadyExists,
  UserNotFound,
} from '../domain';

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
      const { token, refreshToken, accessToken } =
        await this.tokenAuthService.login({
          email: body.email,
          password: body.password,
          ipAddress,
          userAgent: userAgent ?? null,
        });

      return {
        user: UserDtoService.mapToDto(token.session.user),
        session: SessionDtoService.mapToDto(token.session),
        refreshToken,
        accessToken,
      };
    } catch (error) {
      if (
        error instanceof UserNotFound ||
        error instanceof InvalidPassword ||
        error instanceof FailedToCreateSession
      ) {
        throw new UnauthorizedException('Invalid email or password');
      }

      console.error(error);

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
      const { token, refreshToken, accessToken } =
        await this.tokenAuthService.register({
          email: body.email,
          password: body.password,
          name: body.name,
          username: body.username,
          userAgent: userAgent ?? null,
          ipAddress,
        });

      return {
        user: UserDtoService.mapToDto(token.session.user),
        session: SessionDtoService.mapToDto(token.session),
        refreshToken,
        accessToken,
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

      console.error(error);

      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(TokenRefreshDtoSchema))
  @Post('/refresh')
  async refresh(
    @Body() body: TokenRefreshDto,
    @Headers('session') sessionId: string,
  ): Promise<TokenSessionDto> {
    try {
      const { token, refreshToken, accessToken } =
        await this.tokenAuthService.refresh({
          refreshToken: body.refreshToken,
          sessionId,
        });

      return {
        user: UserDtoService.mapToDto(token.session.user),
        session: SessionDtoService.mapToDto(token.session),
        refreshToken,
        accessToken,
      };
    } catch (error) {
      console.error(error);

      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AuthGuard)
  @Post('/logout')
  async logout(@Headers('session') sessionId: string): Promise<void> {
    try {
      await this.tokenAuthService.logout({
        sessionId,
      });
    } catch (error) {
      console.error(error);

      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AuthGuard)
  @Get('/hello')
  async hello() {
    return 'Hello';
  }
}
