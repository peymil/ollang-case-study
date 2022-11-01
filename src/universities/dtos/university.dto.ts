import { ApiProperty } from '@nestjs/swagger';

export class UniversityDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  placement: number;

  @ApiProperty({
    type: [String],
  })
  students: string[];
}
