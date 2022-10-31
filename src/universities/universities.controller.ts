import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UniversitiesService } from './universities.service';

@Controller('universities')
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {}

  @Get()
  getUniversities() {
    return this.universitiesService.getAllUniversities();
  }

  @Delete()
  deleteUniversities() {
    return this.universitiesService.deleteAllUniversities();
  }

  @Get('/:id/students')
  getUniversityStudentsWithUniversityId(@Param('id') id: string) {
    return this.universitiesService.getStudentsOfUniversity(id);
  }

  @Post()
  async createUniversities() {
    const universities = await this.universitiesService.getRealUniversitiesFromAPIAndSort()
    await this.universitiesService.addUniversities(universities)
  }
}
