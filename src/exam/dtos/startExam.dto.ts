import { ApiPropertyOptional } from '@nestjs/swagger';

export class StartExamDto {
  // YYYY-MM-DD
  @ApiPropertyOptional({
    description:
      "Exam date in format YYYY-MM-DD. If not provided uses yesterday's date",
  })
  examDate: string = new Date(+new Date() - 1000 * 60 * 60 * 24)
    .toISOString()
    .split('T')[0];
}
