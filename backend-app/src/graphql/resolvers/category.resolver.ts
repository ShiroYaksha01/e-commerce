import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoriesService } from '../../modules/categories/categories.service';

@Resolver('Category') // <-- matches schema type name
export class CategoryResolver {
  constructor(private readonly categoryService: CategoriesService) {}

  @Query('categories') // <-- matches schema query name
  categories() {
    return this.categoryService.findAll();
  }

  @Mutation('createCategory')
  createCategory(@Args('name') name: string) {
    return this.categoryService.create({ name });
  }
}
