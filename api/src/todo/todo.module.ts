import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  imports: [MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }])],
  exports: [MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }])],
})
export class TodoModule { }
