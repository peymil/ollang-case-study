import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Student } from 'src/students/schemas/student.schema';
import * as mongoose from 'mongoose';

@Schema()
export class University {
  @Prop()
  name: string;

  @Prop()
  placement: number;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Student',
  })
  students: Student[];
}

export type UniversityDocument = University & Document;

export const UniversitySchema = SchemaFactory.createForClass(University);
