import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"
import { BaseSchemaInterface } from "src/common/interfaces/base-schema.interface"
import { BaseSchema } from "src/common/base.schema"

export type TodoDocument = Todo & Document

@Schema()
export class Todo extends BaseSchema implements BaseSchemaInterface {
  @Prop({ required: true })
  title: string

  @Prop()
  description?: string

  @Prop([String])
  categories?: string[]
}

export const TodoSchema = SchemaFactory.createForClass(Todo)