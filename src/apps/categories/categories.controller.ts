import { Controller, Get, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('/')
  async getCategoriesTree(@Query('id') rootId: string) {
    if (rootId) {
      const rowsCategoriesTree = await this.categoriesService.getCategoryTreeRowsByRootId(
        Number(rootId),
      );
      return {
        nodes: this.categoriesService.buildSingleRootTreeFromSql(
          rowsCategoriesTree,
        ),
      };
    }
    const rowsFullCategoriesTree = await this.categoriesService.getFullCategoryTreeRows();
    return {
      nodes: this.categoriesService.buildFullTreeFromSql(
        rowsFullCategoriesTree,
      ),
    };
  }
}
