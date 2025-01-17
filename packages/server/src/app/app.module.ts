import { ConfigModule } from '@/core/modules/config';
import { DatabaseModule } from '@/core/modules/database';
import { Module } from '@nestjs/common';
import { CryptoModule } from '@/core/modules/crypto';
import { DateModule } from '@/core/modules/date';
import { CookieModule } from '@/core/modules/cookie';
import { TokenAuthModule } from '@/aggregates/token-auth/infrastructure';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    CryptoModule,
    DateModule,
    CookieModule,
    TokenAuthModule,
  ],
})
export class AppModule {}
