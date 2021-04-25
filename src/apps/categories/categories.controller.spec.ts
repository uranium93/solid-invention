import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Categories } from 'src/models';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

const mockCategoriesService = {
  sequelize: {
    query: jest.fn(() => {
      Promise.resolve([]);
    }),
  },
};
describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        CategoriesService,
        {
          provide: getModelToken(Categories),
          useValue: mockCategoriesService,
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return correct single tree based on root id if node not found', async () => {
    jest
      .spyOn(service, 'getCategoryTreeRowsByRootId')
      .mockImplementation(() => {
        return Promise.resolve([]);
      });
    const res = await controller.getCategoriesTree('1');
    expect(res).toMatchObject({ nodes: [] });
  });

  it('should return correct single tree based on root id if node found', async () => {
    jest
      .spyOn(service, 'getCategoryTreeRowsByRootId')
      .mockImplementation((): any => {
        return Promise.resolve([
          { id: 1, parent_id: 0, name: 'root', node_level: 1 },
          { id: 2, parent_id: 1, name: 'child 1', node_level: 2 },
          { id: 3, parent_id: 1, name: 'child 2', node_level: 2 },
          { id: 4, parent_id: 2, name: 'child of child 2', node_level: 3 },
          ,
        ]);
      });
    const res = await controller.getCategoriesTree('1');
    expect(res).toMatchObject({
      nodes: [
        {
          id: 1,
          name: 'root',
          parent_id: 0,
          nodes: [
            {
              id: 2,
              name: 'child 1',
              parent_id: 1,
              nodes: [
                { id: 4, name: 'child of child 2', parent_id: 2, nodes: [] },
              ],
            },
            { id: 3, name: 'child 2', parent_id: 1, nodes: [] },
          ],
        },
      ],
    });
  });

  it('should return correct single tree based on root id if node found', async () => {
    jest
      .spyOn(service, 'getFullCategoryTreeRows')
      .mockImplementation((): any => {
        return Promise.resolve([
          { id: 1, parent_id: 0, name: 'root 1', node_level: 1, origin: 1 },
          { id: 2, parent_id: 1, name: 'child 1.1', node_level: 2, origin: 1 },
          { id: 3, parent_id: 0, name: 'root 2', node_level: 1, origin: 3 },
          { id: 4, parent_id: 3, name: 'child 2.1', node_level: 2, origin: 3 },
          ,
        ]);
      });
    const res = await controller.getCategoriesTree('');
    expect(res).toMatchObject({
      nodes: [
        {
          id: 1,
          name: 'root 1',
          parent_id: 0,
          nodes: [{ id: 2, name: 'child 1.1', parent_id: 1, nodes: [] }],
        },
        {
          id: 3,
          name: 'root 2',
          parent_id: 0,
          nodes: [{ id: 4, name: 'child 2.1', parent_id: 3, nodes: [] }],
        },
      ],
    });
  });
});
