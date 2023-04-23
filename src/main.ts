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

  console.log('               _                                           __             __ ');
  console.log('  ____ _____  (_)  ________  ______   _____  _____   _____/ /_____ ______/ /_');
  console.log(' / __ `/ __ \\/ /  / ___/ _ \\/ ___/ | / / _ \\/ ___/  / ___/ __/ __ `/ ___/ __/');
  console.log('/ /_/ / /_/ / /  (__  )  __/ /   | |/ /  __/ /     (__  ) /_/ /_/ / /  / /_  ');
  console.log('\\__,_/ .___/_/  /____/\\___/_/    |___/\\___/_/     /____/\\__/\\__,_/_/   \\__/  ');
  console.log('    /_/                                                                      ');
}
bootstrap();
