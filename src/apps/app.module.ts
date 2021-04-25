import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriesModule } from './categories/categories.module';
import dbConfig from 'src/config/db';
import { Categories } from 'src/models';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: dbConfig.dev.port,
      username: dbConfig.dev.user,
      password: dbConfig.dev.password,
      database: dbConfig.dev.database,
      sync: { alter: true, force: false },
      models: [Categories],
    }),
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
