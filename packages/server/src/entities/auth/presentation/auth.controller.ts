import { Body, Controller, Headers, Inject, Ip, Post } from '@nestjs/common';
import {
  LoginUseCase,
  LoginUseCaseSymbol,
  RegisterUseCase,
  RegisterUseCaseSymbol,
} from '@/entities/auth/domain';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(LoginUseCaseSymbol)
    private readonly loginUseCase: LoginUseCase,
    @Inject(RegisterUseCaseSymbol)
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  @Post('/login')
  login(
    @Body() body: { email: string; password: string },
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.loginUseCase.login({
      email: body.email,
      password: body.password,
      ipAddress,
      userAgent: userAgent ?? null,
    });
  }

  @Post('/register')
  register(
    @Body()
    body: {
      email: string;
      password: string;
      name: string;
      username: string;
    },
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.registerUseCase.register({
      email: body.email,
      password: body.password,
      name: body.name,
      username: body.username,
      userAgent: userAgent ?? null,
      ipAddress,
    });
  }
}
