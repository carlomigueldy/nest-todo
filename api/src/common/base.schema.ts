import { Prop, Schema } from "@nestjs/mongoose";
import { BaseSchemaInterface } from "./interfaces/base-schema.interface";

@Schema()
export class BaseSchema implements BaseSchemaInterface {
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt?: Date;
}