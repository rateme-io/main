import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

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
  app.use(helmet());
  if (process.env.ENV === 'development') {
    app.useGlobalInterceptors(new LoggingInterceptor());
  }
  app.useGlobalInterceptors(new ErrorsInterceptor());
  app.enableCors({
    origin: [process.env.WEB_CLIENT_URL ?? 'http://localhost:3000'],
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
