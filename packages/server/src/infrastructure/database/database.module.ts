import { Global, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConfigService } from '@/infrastructure/config';

@Global()
@Module({
  providers: [
    {
      provide: DataSource,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        try {
          const dataSource = new DataSource({
            type: 'postgres',
            host: configService.db.host,
            port: configService.db.port,
            username: configService.db.user,
            password: configService.db.password,
            database: configService.db.name,
            synchronize: configService.isDevelopment,
            entities: ["dist/infrastructure/repositories/*.repository.{ts,js}"]
          })

          await dataSource.initialize();

          console.log('Connected to the database');

          return dataSource;
        } catch (error) {
          console.error('Failed to connect to the database');

          throw error;
        }
      }
    }
  ]
})
export class DatabaseModule {}