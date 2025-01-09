import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/core/database';
import { ConfigModule } from '@/core/config';
import { AuthModule } from '@/entities/auth/infrastructure';
import { CryptoModule } from '@/core/crypto';

@Module({
  imports: [DatabaseModule, ConfigModule, CryptoModule, AuthModule],
})
export class AppModule {}
