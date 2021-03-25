import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseServiceInterface } from 'src/common/interfaces/base-service.interface';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from './schemas/todo.schema';

@Injectable()
export class TodoService implements BaseServiceInterface<Todo> {
  constructor(
    @InjectModel(Todo.name) private readonly model: Model<TodoDocument>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return await this.model.find({ deletedAt: null }).exec();
  }

  async findOne(id: string): Promise<Todo> {
    return await this.model.findById(id).exec();
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const created = new this.model(createTodoDto);

    return await created.save();
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return await this.model.findByIdAndUpdate(id, {
      ...updateTodoDto,
      updatedAt: new Date(),
    });
  }

  async delete(id: string): Promise<Todo> {
    return await this.model
      .findByIdAndUpdate(id, { deletedAt: new Date() })
      .exec();
  }

  async deleteForever(id: string): Promise<Todo> {
    return await this.model.findByIdAndDelete(id);
  }
}
