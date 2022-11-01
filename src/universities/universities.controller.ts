import { Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UniversitiesService } from "./universities.service";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  SWAGGER_DEFAULT_200_RESPONSE,
  SWAGGER_DEFAULT_201_RESPONSE,
  SWAGGER_DEFAULT_204_RESPONSE
} from "../constants/swaggerResponses.constant";
import { UniversityDto } from "./dtos/university.dto";

@ApiTags("Universities")
@Controller("universities")
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {
  }

  @ApiResponse({ ...SWAGGER_DEFAULT_200_RESPONSE, type: UniversityDto })
  @ApiOperation({ description: "Get all of the universities." })
  @Get()
  getUniversities() {
    return this.universitiesService.getAllUniversities();
  }

  @ApiResponse({ ...SWAGGER_DEFAULT_204_RESPONSE, type: UniversityDto})
  @ApiOperation({ description: "Delete all of the universities." })
  @Delete()
  deleteUniversities() {
    return this.universitiesService.deleteAllUniversities();
  }

  @ApiResponse({ ...SWAGGER_DEFAULT_200_RESPONSE, type: UniversityDto})
  @ApiOperation({ description: "Get students of specific university." })
  @ApiParam({ name: "id", description: "ID of the university" })
  @Get("/:id/students")
  getUniversityStudentsWithUniversityId(@Param("id") id: string) {
    return this.universitiesService.getStudentsOfUniversity(id);
  }

  @ApiResponse({ ...SWAGGER_DEFAULT_201_RESPONSE, type: UniversityDto})
  @ApiOperation({ description: "Create universities." })
  @Post()
  async createUniversities() {
    const universities =
      await this.universitiesService.getRealUniversitiesFromAPIAndSort();
    await this.universitiesService.addUniversities(universities);
  }
}
