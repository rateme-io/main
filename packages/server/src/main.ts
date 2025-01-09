import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.ENV === 'development'
        ? ['log', 'debug', 'error', 'warn']
        : ['error', 'warn'],
  });
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
