import { forwardRef, Global, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { TokenAuthModule } from '@/aggregates/token-auth/infrastructure';
import { SessionAbstractRepository } from '@/entities/session/domain';
import { SessionRepository } from '@/entities/session/infrastructure';
import { UserRepository } from '@/entities/user/infrastructure';

import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [forwardRef(() => TokenAuthModule)],
  providers: [
    AuthService,
    {
      provide: SessionAbstractRepository,
      inject: [DataSource],
      useFactory: (dataSource: DataSource) => {
        const userRepository = new UserRepository(dataSource.manager);

        return new SessionRepository(dataSource.manager, userRepository);
      },
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
