import { Injectable } from '@nestjs/common';
import { RandomUserService } from '../random-user/random-user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './schemas/student.schema';
import { Model, Query } from 'mongoose';
import { University } from '../universities/schemas/university.schema';
import { DeleteResult } from 'mongodb';

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

  async removeUniversityFromAllStudents() {
    return this.studentModel.updateMany(
      {},
      {
        $set: {
          university: undefined,
        },
      },
    );
  }

  assignUniversityToStudents(studentIds: string[], university: University) {
    return this.studentModel.updateMany(
      { _id: { $in: studentIds } },
      {
        university: university,
      },
    );
  }

  deleteStudents(): Query<DeleteResult, StudentDocument> {
    return this.studentModel.deleteMany({});
  }

  async getStudents(): Promise<StudentDocument[]> {
    return this.studentModel.find();
  }

  async getStudentById(id: string): Promise<StudentDocument> {
    return this.studentModel.findById(id);
  }

  addStudents(Student: Student[]): Promise<StudentDocument[]> {
    return this.studentModel.insertMany(Student);
  }
}
