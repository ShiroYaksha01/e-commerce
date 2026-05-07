import { Module } from '@nestjs/common';
import { CategoryResolver } from './resolvers/category.resolver';
import { ProductResolver } from './resolvers/product.resolver';

// ✅ import your existing modules/services
import { CategoriesModule } from '../modules/categories/categories.module';
import { ProductsModule } from '../modules/products/products.module';

@Module({
  imports: [CategoriesModule, ProductsModule],
  providers: [CategoryResolver, ProductResolver],
})
export class GraphqlModule {}
