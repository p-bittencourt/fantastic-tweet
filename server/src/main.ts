import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { env } from 'src/config/env.config';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(env.PORT);
}
bootstrap();
