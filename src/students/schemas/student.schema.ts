import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { University } from '../../universities/schemas/university.schema';

@Schema()
export class Student {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'University' })
  university: University;
}

export type StudentDocument = Student & Document;

export const StudentSchema = SchemaFactory.createForClass(Student);

export const a = 1;
