import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { CollectionModule } from '@/aggregates/collection/infrastructure';
import { PasswordAuthModule } from '@/aggregates/password-auth/infrastructure';
import { RatingSystemModule } from '@/aggregates/rating-system/infrastructure';
import { SessionModule } from '@/aggregates/session/infrastructure';
import { AuthModule } from '@/core/modules/auth';
import { ConfigModule } from '@/core/modules/config';
import { CookieModule } from '@/core/modules/cookie';
import { CryptoModule } from '@/core/modules/crypto';
import { DatabaseModule } from '@/core/modules/database';
import { DateModule } from '@/core/modules/date';
import { JsonSchemaModule } from '@/core/modules/json-schema';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 5,
    }),
    // auth
    AuthModule,
    PasswordAuthModule,
    // tools
    ConfigModule,
    DatabaseModule,
    CryptoModule,
    DateModule,
    CookieModule,
    JsonSchemaModule,
    // aggregates
    CollectionModule,
    RatingSystemModule,
    SessionModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
