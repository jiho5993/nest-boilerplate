import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';
import { ENV } from './config.constant';

export type EnvConfig = Record<string, any>;

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envValues = Object.keys(ENV).map((k) => ENV[k]);
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      PROJECT_NAME: Joi.string().required(),
      ENV: Joi.string()
        .valid(...envValues)
        .default(ENV.DEVELOPMENT),
      GLOBAL_PREFIX: Joi.string().required(),
      USE_SENTRY: Joi.boolean().required().default(false),
      USE_CONSOLE: Joi.boolean().required().default(false),
      API_HOST: Joi.string().default('0.0.0.0'),
      API_PORT: Joi.number().default(3000),
      MYSQL_HOST: Joi.string().required(),
      MYSQL_PORT: Joi.number().required(),
      MYSQL_DATABASE: Joi.string().required(),
      MYSQL_USERNAME: Joi.string().required(),
      MYSQL_PASSWORD: Joi.string(),
      JWT_SECRET_KEY: Joi.string().required(),
      SENTRY_DSN: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get projectName(): string {
    return this.envConfig.PROJECT_NAME;
  }
  get environment(): ENV {
    return this.envConfig.ENV;
  }
  get globalPrefix(): string {
    return this.envConfig.GLOBAL_PREFIX;
  }
  get useSentry(): boolean {
    return this.envConfig.USE_SENTRY;
  }
  get useConsole(): boolean {
    return this.envConfig.USE_CONSOLE;
  }
  get apiHost(): string {
    return this.envConfig.API_HOST;
  }
  get apiPort(): number {
    return parseInt(this.envConfig.API_PORT, 10);
  }
  get mysqlHost(): string {
    return this.envConfig.MYSQL_HOST;
  }
  get mysqlPort(): number {
    return parseInt(this.envConfig.MYSQL_PORT, 10);
  }
  get mysqlDatabase(): string {
    return this.envConfig.MYSQL_DATABASE;
  }
  get mysqlUsername(): string {
    return this.envConfig.MYSQL_USERNAME;
  }
  get mysqlPassword(): string {
    return this.envConfig.MYSQL_PASSWORD;
  }
  get jwtSecretKey(): string {
    return this.envConfig.JWT_SECRET_KEY;
  }
  get sentryDsn(): string {
    return this.envConfig.SENTRY_DSN;
  }
}

export const config = new ConfigService('.env');
