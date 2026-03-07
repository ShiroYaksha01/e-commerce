import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/')
  findAll() {
    return this.taskService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(Number(id));
  }

  @Post('/')
  create(@Body() body: any) {
    return this.taskService.create(body);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.taskService.update(Number(id), body);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(Number(id));
  }

  @Delete('/')
  removeAll() {
    return this.taskService.removeAll();
  }
}