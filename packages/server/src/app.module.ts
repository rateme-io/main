import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infrastructure/database';
import { ConfigModule } from '@/infrastructure/config';

@Module({
  imports: [DatabaseModule, ConfigModule],
})
export class AppModule {
}
