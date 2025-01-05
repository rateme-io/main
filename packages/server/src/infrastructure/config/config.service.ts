import { Injectable } from '@nestjs/common';
import {ConfigService as NestConfigService} from '@nestjs/config';
import * as zod from 'zod'

export enum Env {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  get port(): number {
    return zod.number().default(3000).parse(Number(this.configService.get('PORT')));
  }

  get env(): string {
    return zod.string().default(Env.Development).parse(this.configService.get('ENV'));
  }

  get isDevelopment(): boolean {
    return this.env === Env.Development;
  }

  get db() {
    return {
      host: zod.string().default('localhost').parse(this.configService.get('POSTGRES_HOST')),
      port: zod.number().default(5432).parse(Number(this.configService.get('POSTGRES_PORT'))),
      user: zod.string().default('postgres').parse(this.configService.get('POSTGRES_USER')),
      password: zod.string().default('password').parse(this.configService.get('POSTGRES_PASSWORD')),
      name: zod.string().default('postgres').parse(this.configService.get('POSTGRES_DB')),
    }
  }
}