import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QueryTypes } from 'sequelize';
import { Categories } from 'src/models';
import {
  getFullCategoriesTreeQuery,
  getCategoryTreeByRootIdQuery,
} from './queries';

type CategoriesTreeQueryByRootIdResult = Categories & {
  node_level: number;
};

type FullCategoriesTreeQueryResult = Categories & {
  node_level: number;
  origin: number;
};

type CategoriesTree = {
  id: string;
  name: string;
  parent_id: number;
  nodes: CategoriesTree[] | null;
};

type TreeLevels = {
  [id: string]: {
    id: string;
    name: string;
    parent_id: number;
    nodes: CategoriesTree[] | null;
  };
}[];

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories)
    private categoriesModel: typeof Categories,
  ) {}


  async getFullCategoryTreeRows() {
    return this.categoriesModel.sequelize.query<FullCategoriesTreeQueryResult>(
      getFullCategoriesTreeQuery(),
      {
        type: QueryTypes.SELECT,
      },
    );
  }

  async getCategoryTreeRowsByRootId(rootId: number) {
    return this.categoriesModel.sequelize.query<FullCategoriesTreeQueryResult>(
      getCategoryTreeByRootIdQuery(rootId),
      {
        type: QueryTypes.SELECT,
      },
    );
  }
}
