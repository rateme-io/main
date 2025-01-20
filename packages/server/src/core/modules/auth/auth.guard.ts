import {
  CanActivate,
  ExecutionContext,
  Global,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';

@Global()
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const isValid = await this.authService.checkSession({
      request,
    });

    if (!isValid) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
