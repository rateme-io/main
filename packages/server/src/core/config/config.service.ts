import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import * as zod from 'zod';
import * as fs from 'node:fs';
import { DurationParser } from '@/core/parsers/duration.parser';

export enum Env {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  private _privateKey: string | null = null;

  get port(): number {
    return zod
      .number()
      .default(3000)
      .parse(Number(this.configService.get('PORT')));
  }

  get env(): string {
    return zod
      .string()
      .default(Env.Development)
      .parse(this.configService.get('ENV'));
  }

  get isDevelopment(): boolean {
    return this.env === Env.Development;
  }

  get privateKey(): string {
    if (this._privateKey) {
      return this._privateKey;
    }

    this._privateKey = fs.readFileSync('private.key', 'utf8');

    return this._privateKey;
  }

  get auth() {
    const authTokenExpiresIn = zod
      .string()
      .default('1h')
      .parse(this.configService.get('ACCESS_TOKEN_EXPIRES_IN'));

    const refreshTokenExpiresIn = zod
      .string()
      .default('7d')
      .parse(this.configService.get('REFRESH_TOKEN_EXPIRES_IN'));

    return {
      accessToken: {
        expiresIn: DurationParser.parse(authTokenExpiresIn),
      },
      refreshToken: {
        expiresIn: DurationParser.parse(refreshTokenExpiresIn),
      },
    };
  }

  get db() {
    return {
      host: zod
        .string()
        .default('localhost')
        .parse(this.configService.get('POSTGRES_HOST')),
      port: zod
        .number()
        .default(5432)
        .parse(Number(this.configService.get('POSTGRES_PORT'))),
      user: zod
        .string()
        .default('postgres')
        .parse(this.configService.get('POSTGRES_USER')),
      password: zod
        .string()
        .default('password')
        .parse(this.configService.get('POSTGRES_PASSWORD')),
      name: zod
        .string()
        .default('postgres')
        .parse(this.configService.get('POSTGRES_DB')),
    };
  }
}
