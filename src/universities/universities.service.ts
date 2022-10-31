import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { University } from './schemas/university.schema';
import { HipolabsUniversitiesService } from '../hipoLabsUniversities/hipolabsUniversities.service';

@Injectable()
export class UniversitiesService {
  constructor(
    private readonly hipolabsUniversitiesService: HipolabsUniversitiesService,
    @InjectModel(University.name)
    private readonly universityModel: Model<University>,
  ) {}

  getAllUniversities() {
    return this.universityModel.find({});
  }

  deleteAllUniversities() {
    return this.universityModel.deleteMany({});
  }

  getStudentsOfUniversity(universityId: string) {
    return this.universityModel
      .findById(universityId)
      .populate('students')
      .then((u) => u.students);
  }

  async getRealUniversitiesFromAPIAndSort(): Promise<University[]> {
    const universities =
      await this.hipolabsUniversitiesService.getTurkishUniversities();
    const sortedUniversities = universities.sort(
      (a, b) =>
        a.name.split('')[0].toLowerCase().charCodeAt(0) -
        b.name.split('')[0].toLowerCase().charCodeAt(0),
    );
    return sortedUniversities.map((university, n) => {
      const universityToInsert = new University();
      universityToInsert.name = university.name;
      universityToInsert.placement = n;
      return universityToInsert;
    });
  }

  async getUniversityByPlacement(placement: number) {
    return this.universityModel.findOne({ placement: placement });
  }

  async addUniversities(universities: University[]) {
    return this.universityModel.insertMany(universities);
  }
}
