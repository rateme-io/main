import { Module } from '@nestjs/common';
import { AuthController } from '@/entities/auth/presentation';
import { UserModule } from '@/entities/user/infrastructure';
import {
  AuthService,
  LoginUseCaseSymbol,
  RegisterUseCaseSymbol,
} from '@/entities/auth/domain';
import { UserAbstractRepository } from '@/entities/user/domain';
import {
  CreateSessionUseCaseSymbol,
  RefreshSessionUseCaseSymbol,
  RemoveSessionUseCaseSymbol,
} from '@/entities/session/domain';
import { CryptoService } from '@/core/crypto';
import { SessionModule } from '@/entities/session/infrastructure';
import { EntityModule } from '@/core/modules';

@Module(
  EntityModule.config({
    imports: [UserModule, SessionModule],
    controllers: [AuthController],
    useCases: (create) => [
      create({
        useCases: [LoginUseCaseSymbol, RegisterUseCaseSymbol],
        inject: [
          UserAbstractRepository,
          CreateSessionUseCaseSymbol,
          RemoveSessionUseCaseSymbol,
          RefreshSessionUseCaseSymbol,
          CryptoService,
        ] as const,
        serviceFactory: (...inject) => new AuthService(...inject),
      }),
    ],
  }),
)
export class AuthModule {}
