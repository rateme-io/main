import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app';
import * as cookieParser from 'cookie-parser';
import { LoggingInterceptor } from '@/core/interceptors/logging.interceptor';
import { ErrorsInterceptor } from '@/core/interceptors/errors.interceptor';

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
