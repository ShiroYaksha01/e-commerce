import {
  Get,
  Param,
  Controller,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get('/')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  @Post('/')
  create(@Body() body: createUserDto) {
    return this.usersService.create(body);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: Partial<createUserDto>) {
    return this.usersService.update(Number(id), body);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }
}