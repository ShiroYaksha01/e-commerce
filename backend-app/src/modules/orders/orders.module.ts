import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/database/entities/orders.entity';
import { Receipt } from 'src/database/entities/receipts.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Receipt]),
    CoreModule,
    NotificationsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [TypeOrmModule, OrdersService],
})
export class OrdersModule {}