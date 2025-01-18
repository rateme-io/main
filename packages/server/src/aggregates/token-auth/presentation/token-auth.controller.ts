import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Ip,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  TokenRegisterDto,
  TokenRegisterDtoSchema,
} from '@rateme/core/domain/dtos/token-auth/token-register.dto';
import { ZodValidationPipe } from '@/core/pipes';
import {
  TokenLoginDto,
  TokenLoginDtoSchema,
} from '@rateme/core/domain/dtos/token-auth/token-login.dto';
import { UserDtoService } from '@rateme/core/domain/dtos/entities/user.dto';
import { TokenSessionDto } from '@rateme/core/domain/dtos/token-auth/token-session.dto';
import { SessionDtoService } from '@rateme/core/domain/dtos/entities/session.dto';

import { AuthGuard } from '@/core/modules/auth';
import {
  FailedToCreateSession,
  InvalidPassword,
  TokenAuthAbstractService,
  TokenAuthService,
  UserAlreadyExists,
  UserDoesntHavePassword,
  UserNotFound,
} from '../domain';
import { CookieService } from '@/core/modules/cookie';

@Controller('/auth/token')
export class TokenAuthController {
  constructor(
    @Inject(TokenAuthAbstractService)
    private readonly tokenAuthService: TokenAuthService,
    @Inject(CookieService)
    private readonly cookieService: CookieService,
  ) {}

  @UsePipes(new ZodValidationPipe(TokenLoginDtoSchema))
  @Post('/login')
  async login(
    @Res({ passthrough: true }) response: Response,
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

      this.cookieService.setRefreshToken(response, refreshToken);
      this.cookieService.setAccessToken(response, accessToken);
      this.cookieService.setSessionId(response, token.session.id);

      return {
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

      if (error instanceof UserDoesntHavePassword) {
        throw new UnauthorizedException('User does not have password');
      }

      throw error;
    }
  }

  @UsePipes(new ZodValidationPipe(TokenRegisterDtoSchema))
  @Post('/register')
  async register(
    @Res({ passthrough: true }) response: Response,
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

      this.cookieService.setRefreshToken(response, refreshToken);
      this.cookieService.setAccessToken(response, accessToken);
      this.cookieService.setSessionId(response, token.session.id);

      return {
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

      throw error;
    }
  }

  @Post('/refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<TokenSessionDto> {
    try {
      const usersRefreshToken = this.cookieService.getRefreshToken(request);
      const sessionId = this.cookieService.getSessionId(request);

      if (!usersRefreshToken || !sessionId) {
        throw new UnauthorizedException();
      }

      const { token, refreshToken, accessToken } =
        await this.tokenAuthService.refresh({
          refreshToken: usersRefreshToken,
          sessionId,
        });

      this.cookieService.setRefreshToken(response, refreshToken);
      this.cookieService.setAccessToken(response, accessToken);
      this.cookieService.setSessionId(response, token.session.id);

      return {
        user: UserDtoService.mapToDto(token.session.user),
        session: SessionDtoService.mapToDto(token.session),
      };
    } catch (error) {
      if (error instanceof UserNotFound) {
        throw new UnauthorizedException('User not found');
      }

      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Post('/logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    try {
      const sessionId = this.cookieService.getSessionId(request);

      if (sessionId === null) {
        throw new UnauthorizedException();
      }

      await this.tokenAuthService.logout({
        sessionId,
      });

      this.cookieService.clearAccessToken(response);
      this.cookieService.clearRefreshToken(response);
      this.cookieService.clearSessionId(response);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Get('/hello')
  async hello() {
    return 'Hello';
  }
}
