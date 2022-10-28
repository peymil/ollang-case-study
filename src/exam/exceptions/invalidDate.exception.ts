import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidDateException extends HttpException {
  constructor() {
    super('Invalid date string. Enter a YYYY-MM-DD formatted string', HttpStatus.BAD_REQUEST);
  }
}