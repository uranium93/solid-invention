import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriesModule } from './categories/categories.module';
import * as dbConfig from 'src/config/db';
import { Categories } from 'src/models';

export const getDbConfigByEnv = (
  config = dbConfig,
): typeof dbConfig['production'] => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return config.production;
    case 'test':
      return config.test;
    default:
      return config.development;
  }
};

const configByEnv = getDbConfigByEnv(dbConfig);

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: configByEnv.host,
      port: configByEnv.port,
      username: configByEnv.username,
      password: configByEnv.password,
      database: configByEnv.database,
      sync: { alter: true, force: false },
      logging: false,
      synchronize: true,
      models: [Categories],
    }),
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
