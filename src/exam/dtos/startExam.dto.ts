
export class StartExamDto {
  // YYYY-MM-DD
  examDate: string = new Date(+new Date() - 1000 * 60 * 60 * 24)
    .toISOString()
    .split('T')[0];
}