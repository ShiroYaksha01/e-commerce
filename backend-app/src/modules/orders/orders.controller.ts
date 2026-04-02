import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findAll() {
    return await this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ordersService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateOrderDto) {
    return await this.ordersService.create(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return await this.ordersService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.ordersService.remove(id);
  }
}
