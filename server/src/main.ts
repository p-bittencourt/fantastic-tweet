import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { env } from 'config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(env.PORT);
}
bootstrap();
