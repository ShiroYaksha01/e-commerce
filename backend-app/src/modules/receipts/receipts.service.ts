import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receipt } from 'src/database/entities/receipts.entity';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { NotificationsService } from 'src/notifications/notifications.service'; 

@Injectable()
export class ReceiptsService {
  constructor(
    @InjectRepository(Receipt)
    private readonly receiptRepo: Repository<Receipt>,
    private readonly notifications: NotificationsService,
  ) {}

  async findAll() {
    const found = await this.receiptRepo.find({ order: { issuedAt: 'DESC' } })

    found.forEach(receipt => {
      this.notifications.notify('get all', {
        receiptId: receipt.receiptId,
        price: receipt.price,
      });
    });
    return found;
    
  }

  async findOne(receiptId: string) {
    const receipt = await this.receiptRepo.findOne({ where: { receiptId } });
    if (!receipt) throw new NotFoundException('Receipt not found');
    return receipt;
  }

  async create(dto: CreateReceiptDto) {
    const receipt = this.receiptRepo.create({
      issuedAt: dto.issuedAt ? new Date(dto.issuedAt) : undefined,
      name: dto.name,
      price: dto.price,
    });

    const saved = await this.receiptRepo.save(receipt);
    
    this.notifications.notify('receipt_created', {
      receiptId: saved.receiptId,
      price: saved.price,
    });


    return saved;
  }

  async update(receiptId: string, dto: UpdateReceiptDto) {
    const receipt = await this.findOne(receiptId);

    if (dto.issuedAt !== undefined) receipt.issuedAt = new Date(dto.issuedAt);
    if (dto.name !== undefined) receipt.name = dto.name;
    if (dto.price !== undefined) receipt.price = dto.price;

    return this.receiptRepo.save(receipt);
  }

  async remove(receiptId: string) {
    const receipt = await this.findOne(receiptId);
    await this.receiptRepo.remove(receipt);
    return { deleted: true, receiptId };
  }
}
