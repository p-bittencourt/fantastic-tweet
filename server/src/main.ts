import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { env } from 'src/config/env.config';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  app.use(helmet());
  app.enableCors({
    origin: [process.env.REACT_APP_URL],
    methods: ['GET', 'POST', 'OPTIONS'],
  });
  app.setGlobalPrefix('api', {
    exclude: ['/'],
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(env.PORT);
}
bootstrap();
