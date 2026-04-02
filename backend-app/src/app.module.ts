import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptModule } from './modules/receipts/receipts.module';
import { OrdersModule } from './modules/orders/orders.module';
import { Receipt } from './database/entities/receipts.entity';
import { Order } from './database/entities/orders.entity';
import { ConfigModule } from '@nestjs/config';

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
      entities: [Order, Receipt],
      synchronize: true,
    }),
    OrdersModule,
    ReceiptModule,
  ],
})
export class AppModule {}
