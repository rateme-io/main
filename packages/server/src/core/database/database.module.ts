import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@/core/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.db.host,
        port: configService.db.port,
        username: configService.db.user,
        password: configService.db.password,
        database: configService.db.name,
        synchronize: configService.isDevelopment,
        entities: [
          'dist/entities/**/infrastructure/*.repository.entity.{ts,js}',
          'dist/entities/**/infrastructure/entities/*.repository.entity.{ts,js}',
        ],
        migrations: ['dist/app/migrations/*.{ts,js}'],
        migrationsTableName: 'migrations',
      }),
    }),
  ],
})
export class DatabaseModule {}
