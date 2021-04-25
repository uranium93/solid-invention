import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Categories } from 'src/models';
import { CategoriesService } from './categories.service';
import {
  getFullCategoriesTreeQuery,
  getCategoryTreeByRootIdQuery,
} from './queries';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let spyOnQuery = jest.fn();
  beforeEach(async () => {
    spyOnQuery = jest.fn();
    const mockCategoriesService = {
      sequelize: {
        query: spyOnQuery,
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getModelToken(Categories),
          useValue: mockCategoriesService,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return expected formatted full tree', () => {
    const res = service.buildFullTreeFromSql([
      { id: 1, parent_id: 0, name: 'test', node_level: 1 },
      { id: 2, parent_id: 1, name: 'test 1', node_level: 2 },
      { id: 3, parent_id: 1, name: 'test 2', node_level: 2 },
      { id: 4, parent_id: 2, name: 'test 3', node_level: 3 },
      { id: 5, parent_id: 0, name: 'root 2', node_level: 1 },
      { id: 6, parent_id: 5, name: 'root 2.1', node_level: 2 },
    ] as any);
    expect(JSON.stringify(res)).toBe(
      '[{"id":1,"name":"test","parent_id":0,"nodes":[{"id":2,"name":"test 1","parent_id":1,"nodes":[{"id":4,"name":"test 3","parent_id":2,"nodes":[]}]},{"id":3,"name":"test 2","parent_id":1,"nodes":[]}]},{"id":5,"name":"root 2","parent_id":0,"nodes":[{"id":6,"name":"root 2.1","parent_id":5,"nodes":[]}]}]',
    );
  });

  it('should return expected formatted single tree ', () => {
    const res = service.buildFullTreeFromSql([
      { id: 1, parent_id: 0, name: 'test', node_level: 1 },
      { id: 2, parent_id: 1, name: 'test 1', node_level: 2 },
      { id: 3, parent_id: 1, name: 'test 2', node_level: 2 },
      { id: 4, parent_id: 2, name: 'test 3', node_level: 3 },
    ] as any);
    expect(JSON.stringify(res)).toBe(
      '[{"id":1,"name":"test","parent_id":0,"nodes":[{"id":2,"name":"test 1","parent_id":1,"nodes":[{"id":4,"name":"test 3","parent_id":2,"nodes":[]}]},{"id":3,"name":"test 2","parent_id":1,"nodes":[]}]}]',
    );
  });

  it('should call raw query with correct params [FUll Tree]', () => {
    service.getFullCategoryTreeRows();
    expect(spyOnQuery).toBeCalledTimes(1);
    expect(spyOnQuery).toBeCalledWith(getFullCategoriesTreeQuery(), {
      type: 'SELECT',
    });
  });

  it('should call raw query with correct params [Single Tree]', () => {
    service.getCategoryTreeRowsByRootId(1);
    expect(spyOnQuery).toBeCalledTimes(1);
    expect(spyOnQuery).toBeCalledWith(getCategoryTreeByRootIdQuery(1), {
      type: 'SELECT',
    });
  });
});
