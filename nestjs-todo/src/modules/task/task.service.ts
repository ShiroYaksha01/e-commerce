import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../tasks/task.entity';
import { User } from 'src/users/user.entity';


@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAll() {
    return this.taskRepo.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    return this.taskRepo.findOne({ where: { id }, relations: ['user'] });
  }

  async create(body: { name: string; description?: string; userId?: number }) {
    const task = this.taskRepo.create({
      name: body.name,
      description: body.description,
    });
    return this.taskRepo.save(task);
  }

  async update(id: number, body: Partial<{ name: string; description: string; completedAt: Date }>) {
    await this.taskRepo.update(id, body);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.taskRepo.delete(id);
    return { message: 'success' };
  }

  async removeAll() {
    await this.taskRepo.clear();
    return { message: 'success' };
  }
}