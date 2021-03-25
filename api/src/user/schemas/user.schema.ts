import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from 'src/common/base.schema';
import { BaseSchemaInterface } from 'src/common/interfaces/base-schema.interface';

export type UserDocument = User & Document;

@Schema()
export class User extends BaseSchema implements BaseSchemaInterface {
  @Prop()
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
