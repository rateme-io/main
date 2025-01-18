import { ConfigModule } from '@/core/modules/config';
import { DatabaseModule } from '@/core/modules/database';
import { Module } from '@nestjs/common';
import { CryptoModule } from '@/core/modules/crypto';
import { DateModule } from '@/core/modules/date';
import { CookieModule } from '@/core/modules/cookie';
import { TokenAuthModule } from '@/aggregates/token-auth/infrastructure';
import { CollectionModule } from '@/aggregates/collection/infrastructure';
import { AuthModule } from '@/core/modules/auth';
import { JsonSchemaModule } from '@/core/modules/json-schema';
import { RatingSystemModule } from '@/aggregates/rating-system/infrastructure';

@Module({
  imports: [
    // auth
    AuthModule,
    TokenAuthModule,
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
  ],
})
export class AppModule {}
