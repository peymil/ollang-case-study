import { StudentDocument } from '../../students/schemas/student.schema';

export type StudentWithExamScore = StudentDocument & { examScore: number };