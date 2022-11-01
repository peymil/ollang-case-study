import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  SWAGGER_DEFAULT_200_RESPONSE,
  SWAGGER_DEFAULT_201_RESPONSE,
  SWAGGER_DEFAULT_204_RESPONSE,
} from '../constants/swaggerResponses.constant';
import { UniversityDto } from './dtos/university.dto';
import { DefaultResponseDto } from '../dtos/defaultResponse.dto';
import { StatusCodesEnum } from '../enums/status.enum';

@ApiTags('Universities')
@Controller('universities')
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {}

  @ApiResponse({ ...SWAGGER_DEFAULT_200_RESPONSE, type: UniversityDto })
  @ApiOperation({ description: 'Get all of the universities.' })
  @Get()
  getUniversities() {
    return this.universitiesService.getAllUniversities();
  }

  @ApiResponse({ ...SWAGGER_DEFAULT_204_RESPONSE, type: DefaultResponseDto })
  @ApiOperation({ description: 'Delete all of the universities.' })
  @Delete()
  async deleteUniversities() {
    const deleteOp = await this.universitiesService.deleteAllUniversities();
    const res = new DefaultResponseDto();
    res.affected = deleteOp.deletedCount;
    res.status = StatusCodesEnum.OK;
    return res;
  }

  @ApiResponse({ ...SWAGGER_DEFAULT_200_RESPONSE, type: UniversityDto })
  @ApiOperation({ description: 'Get students of specific university.' })
  @ApiParam({ name: 'id', description: 'ID of the university' })
  @Get('/:id/students')
  getUniversityStudentsWithUniversityId(@Param('id') id: string) {
    return this.universitiesService.getStudentsOfUniversity(id);
  }

  @ApiResponse({ ...SWAGGER_DEFAULT_201_RESPONSE, type: DefaultResponseDto })
  @ApiOperation({ description: 'Create universities.' })
  @Post()
  async createUniversities() {
    const universities =
      await this.universitiesService.getRealUniversitiesFromAPIAndSort();
    const universitiesInserted = await this.universitiesService.addUniversities(
      universities,
    );
    const res = new DefaultResponseDto();
    res.affected = universitiesInserted.length;
    res.status = StatusCodesEnum.OK;
    return res;
  }
}
