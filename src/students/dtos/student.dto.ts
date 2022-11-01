import { ApiProperty } from '@nestjs/swagger';

export class StudentDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({
    type: String,
  })
  university: string;
}
