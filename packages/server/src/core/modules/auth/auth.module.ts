import { forwardRef, Global, Module } from '@nestjs/common';

import { PasswordAuthModule } from '@/aggregates/password-auth/infrastructure';
import { SessionModule } from '@/aggregates/session/infrastructure';

import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [forwardRef(() => PasswordAuthModule), forwardRef(() => SessionModule)],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
