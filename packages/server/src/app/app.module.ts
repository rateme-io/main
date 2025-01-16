import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/core/database';
import { ConfigModule } from '@/core/config';
import { CryptoModule } from '@/core/crypto';
import { DateModule } from '@/core/date';
import { TokenAuthModule } from '@/aggregates/token-auth/infrastructure';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    CryptoModule,
    DateModule,
    TokenAuthModule,
  ],
})
export class AppModule {}
