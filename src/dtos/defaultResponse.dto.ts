import { ApiProperty } from "@nestjs/swagger";
import { STATUS_CODES } from "../constants/statusCodes.constant";
import { StatusCodesEnum } from "../enums/status.enum";

export class DefaultResponseDto {

  @ApiProperty({ enum: STATUS_CODES })
  status: StatusCodesEnum

  @ApiProperty()
  affected: number;
}
