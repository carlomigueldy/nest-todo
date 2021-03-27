import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseServiceInterface } from 'src/common/interfaces/base-service.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements BaseServiceInterface<User> {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return await this.model.find({ deletedAt: null }).exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.model.findOne({ _id: id, deletedAt: null }).exec();
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return await this.model.findOne({ email: email }).exec();
  }

  async create(createModelDto: CreateUserDto): Promise<User> {
    return await new this.model({
      ...createModelDto,
      password: await bcrypt.hash(createModelDto.password, 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    }).save();
  }

  async update(id: string, updateModelDto: UpdateUserDto): Promise<User> {
    return await this.model
      .findOneAndUpdate(
        { _id: id, deletedAt: null },
        {
          ...updateModelDto,
          updatedAt: new Date(),
        },
      )
      .exec();
  }

  async delete(id: string): Promise<User> {
    return await this.model
      .findOneAndUpdate(
        { _id: id, deletedAt: null },
        {
          deletedAt: new Date(),
        },
      )
      .exec();
  }

  async deleteForever(id: string): Promise<User> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
