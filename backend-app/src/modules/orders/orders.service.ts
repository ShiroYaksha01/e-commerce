import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/database/entities/orders.entity';
import { Receipt } from 'src/database/entities/receipts.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { NotificationsService } from 'src/notifications/notifications.service';


@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(Receipt)
    private readonly receiptRepo: Repository<Receipt>,
    //@Inject('ORDERS_SERVICE') private client: ClientProxy,
    private readonly notifications: NotificationsService,
  ) {}

  async findAll() {
    return this.orderRepo.find({
      relations: ['receipt'],
      order: { issuedAt: 'DESC' },
    });
  }

  async findOne(orderId: string) {
    const order = await this.orderRepo.findOne({
      where: { orderId },
      relations: ['receipt'],
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async create(dto: CreateOrderDto) {
    // Create the receipt for this order
    const receipt = this.receiptRepo.create({
      issuedAt: dto.issuedAt ? new Date(dto.issuedAt) : undefined,
      name: dto.name,
      price: dto.price,
    });
    const savedReceipt = await this.receiptRepo.save(receipt);

    // Create the order with the receipt
    const order = this.orderRepo.create({
      issuedAt: dto.issuedAt ? new Date(dto.issuedAt) : undefined,
      name: dto.name,
      price: dto.price,
      receipt: savedReceipt,
    });

    const saved = await this.orderRepo.save(order);

    this.notifications.notify('order_created', {
        orderId: saved.orderId,
        receiptId: saved.receipt.receiptId,
        price: saved.price,
    });


    return saved;
  }

  async update(orderId: string, dto: UpdateOrderDto) {
    const order = await this.findOne(orderId);

    if (dto.issuedAt !== undefined) order.issuedAt = new Date(dto.issuedAt);
    if (dto.name !== undefined) order.name = dto.name;
    if (dto.price !== undefined) order.price = dto.price;

    // Also update the associated receipt if it exists
    if (order.receipt) {
      if (dto.name !== undefined) order.receipt.name = dto.name;
      if (dto.price !== undefined) order.receipt.price = dto.price;
      if (dto.issuedAt !== undefined)
        order.receipt.issuedAt = new Date(dto.issuedAt);
      await this.receiptRepo.save(order.receipt);
    }

    const saved = await this.orderRepo.save(order);

    this.notifications.notify('order_updated', {
        orderId: saved.orderId,
        receiptId: saved.receipt.receiptId,
        price: saved.price,
    });


    return saved;
  }

  async remove(orderId: string) {
    const order = await this.findOne(orderId);
    // The receipt will be cascade deleted due to the cascade: true in the Order entity
    await this.orderRepo.remove(order);
    return { deleted: true, orderId };
  }
}
