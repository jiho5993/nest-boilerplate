import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from './app/logger/logger.module';
import { RequestMiddleware } from './app/middlewares/request.middleware';
import { MysqlConfigService } from './app/mysql/mysql-config.service';
import { SentryModule } from './app/sentry/sentry.module';
import { HealthModule } from './health/health.module';

export const TypeOrmRootModule = TypeOrmModule.forRootAsync({
  useClass: MysqlConfigService,
});

@Module({
  imports: [TypeOrmModule, LoggerModule, HealthModule, SentryModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(RequestMiddleware).forRoutes('*');
  }
}
