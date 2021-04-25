import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/apps/app.module';
import { SeedDatabaseForTesting } from './seedDbTest';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await SeedDatabaseForTesting();
  });

  it('/ (GET) Full Categories Tree', () => {
    return request(app.getHttpServer())
      .get('/categories')
      .expect(200)
      .expect(
        '{"nodes":[{"id":1,"name":"root_1","parent_id":0,"nodes":[{"id":3,"name":"child_1.1","parent_id":1,"nodes":[{"id":4,"name":"child_1.1.1","parent_id":3,"nodes":[]}]}]},{"id":2,"name":"root_2","parent_id":0,"nodes":[{"id":5,"name":"child_2.1","parent_id":2,"nodes":[]}]}]}',
      );
  });

  it('/ (GET) Categories Tree By Root Id', () => {
    return request(app.getHttpServer())
      .get('/categories?id=2')
      .expect(200)
      .expect(
        '{"nodes":[{"id":2,"name":"root_2","parent_id":0,"nodes":[{"id":5,"name":"child_2.1","parent_id":2,"nodes":[]}]}]}',
      );
  });

  it('/ (NOT ALLOWED) reject non allowed methods', () => {
    return request(app.getHttpServer()).post('/categories').expect(404);
  });
});
