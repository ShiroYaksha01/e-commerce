import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

// @UseGuards(ApiKeyGuard)
@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Get()
  async findAll() {
    return await this.receiptsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.receiptsService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateReceiptDto) {
    return await this.receiptsService.create(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateReceiptDto) {
    return await this.receiptsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.receiptsService.remove(id);
  }

}
