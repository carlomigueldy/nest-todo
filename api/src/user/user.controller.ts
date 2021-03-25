import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BaseController } from 'src/common/interfaces/base-controller.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController implements BaseController<User> {
  constructor(private readonly service: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() createModelDto: CreateUserDto): Promise<User> {
    return await this.service.create(createModelDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateModelDto: UpdateUserDto,
  ): Promise<User> {
    return await this.service.update(id, updateModelDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return await this.service.delete(id);
  }

  @Delete(':id/force-delete')
  async forceDelete(id: string): Promise<User> {
    return await this.service.deleteForever(id);
  }
}
