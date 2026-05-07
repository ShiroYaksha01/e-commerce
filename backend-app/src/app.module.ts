import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptModule } from './modules/receipts/receipts.module';
import { OrdersModule } from './modules/orders/orders.module';
import { Receipt } from './database/entities/receipts.entity';
import { Order } from './database/entities/orders.entity';
import { ConfigModule } from '@nestjs/config';
import { NotificationsModule } from './notifications/notifications.module';
import { CoreModule } from './core/core.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { Category } from './database/entities/categories.entity';
import { Product } from './database/entities/products.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';
import { join } from 'path';
import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'shiro',
      password: '123',
      database: 'receipt_db',
      entities: [Order, Receipt, Category, Product],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // ✅ We will switch between schema-first and code-first later
      // typePaths: [join(process.cwd(), 'src/graphql/schema/*.graphql')], // schema-first
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'), // code-first (later)
      playground: true,
      // plugins: [ApolloServerPluginLandingPageGraphQLPlayground() as any],
    }),
    CoreModule,
    OrdersModule,
    ReceiptModule,
    NotificationsModule,
    CategoriesModule,
    ProductsModule,
    GraphqlModule,
  ],
})
export class AppModule {}
