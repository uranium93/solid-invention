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

  public buildFullTreeFromSql(sqlResult: FullCategoriesTreeQueryResult[]) {
    const treesByOrigins = {};
    sqlResult.forEach(({ origin, parent_id, id, name, node_level }) => {
      if (!treesByOrigins[origin]) {
        treesByOrigins[origin] = [{ id, name, parent_id, node_level }];
        return;
      }
      treesByOrigins[origin] = [
        ...(treesByOrigins[origin] || {}),
        { id, name, parent_id, node_level },
      ];
    });
    const result = [];
    Object.values(treesByOrigins).map((treeByOrigin: any) => {
      result.push(this.buildSingleRootTreeFromSql(treeByOrigin));
    });
    return result;
  }

  public buildSingleRootTreeFromSql(
    sqlResult: CategoriesTreeQueryByRootIdResult[],
  ) {
    const treeLevels: TreeLevels = [];
    sqlResult.forEach(({ parent_id, id, name, node_level }) => {
      treeLevels[node_level] = {
        ...treeLevels[node_level],
        [id]: { id, name, parent_id, nodes: [] },
      };
    });

    for (let level = treeLevels.length - 1; level > 1; level--) {
      Object.values(treeLevels[level]).forEach((node) => {
        treeLevels[level - 1][node.parent_id].nodes.push(node);
      });
    }
    return Object.values(treeLevels[1]);
  }

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
