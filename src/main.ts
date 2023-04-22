import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './app/config/config.service';
import * as Sentry from '@sentry/node';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (config.useSentry) {
    Sentry.init({ dsn: config.sentryDsn });
  }

  app.setGlobalPrefix(config.globalPrefix);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.use(helmet());
  app.enableCors();

  await app.listen(config.apiPort, config.apiHost);
}
bootstrap();
