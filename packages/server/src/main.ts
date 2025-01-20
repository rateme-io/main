import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from '@/app';
import { ErrorsInterceptor } from '@/core/interceptors/errors.interceptor';
import { LoggingInterceptor } from '@/core/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.ENV === 'development'
        ? ['log', 'debug', 'error', 'warn']
        : ['error', 'warn'],
  });
  app.use(cookieParser());
  if (process.env.ENV === 'development') {
    app.useGlobalInterceptors(new LoggingInterceptor());
  }
  app.useGlobalInterceptors(new ErrorsInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
