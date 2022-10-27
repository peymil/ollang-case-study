import { Injectable } from '@nestjs/common';
import { RandomUserService } from '../random-user/random-user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from "./schemas/student.schema";
import { Model } from 'mongoose';

@Injectable()
export class StudentsService {
  constructor(
    private readonly randomUserService: RandomUserService,
    @InjectModel('Student') private readonly studentModel: Model<Student>,
  ) {}

  async generateStudents(n: number): Promise<Student[]> {
    const students = await this.randomUserService.getNUser(n);
    return students.results.map((student) => {
      const studentToInsert = new Student();
      studentToInsert.firstName = student.name.first;
      studentToInsert.lastName = student.name.last;
      studentToInsert.university = null;
      return studentToInsert;
    });
  }

  deleteStudents() {
    return this.studentModel.deleteMany({});
  }

  async getStudents() {
    return this.studentModel.find();
  }

  async getStudentById(id: string) {
    return this.studentModel.findById(id);
  }

  addStudents(Student: Student[]) {
    return this.studentModel.insertMany(Student);
  }
}
