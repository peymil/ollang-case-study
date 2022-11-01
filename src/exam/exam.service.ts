import { Injectable } from '@nestjs/common';
import { WikipediaService } from '../wikipedia/wikipedia.service';
import { StudentsService } from '../students/students.service';
import { PageViewMetricItemArticles } from '../wikipedia/types/PageViewMetricResponse';
import { UniversitiesService } from '../universities/universities.service';
import { StudentDocument } from '../students/schemas/student.schema';
import { StudentWithExamScore } from './types/StudentWithExamScore';

@Injectable()
export class ExamService {
  constructor(
    private readonly wikipediaService: WikipediaService,
    private readonly studentsService: StudentsService,
    private readonly universitiesService: UniversitiesService,
  ) {}

  calculateExamScore(
    name: string,
    articles: PageViewMetricItemArticles[],
  ): number {
    name = name.replace(/\s+/g, '').toLowerCase();
    const nameArr = name.split('');

    let score = 0;
    for (const { article } of articles) {
      const titleArr = article.replace(/\s+/g, '').toLowerCase().split('');
      let foundRepetitiveChars = new Set();
      for (const titleChr of titleArr) {
        if (nameArr.includes(titleChr)) {
          foundRepetitiveChars.add(titleChr);
        }
      }
      score += foundRepetitiveChars.size;
    }

    return score;
  }

  async placeStudents(
    studentsWithScores: StudentWithExamScore[],
  ): Promise<StudentDocument[]> {
    const universitiesPromiseQueue = [];
    const studentsPromiseQueue = [];
    let i = 0;
    for (const student of studentsWithScores) {
      const university =
        await this.universitiesService.getUniversityByPlacement(
          Math.floor(i / 5) + 1,
        );
      if (!university) break;
      universitiesPromiseQueue.push(
        this.universitiesService.assignStudentToUniversity(
          university._id,
          student,
        ),
      );
      studentsPromiseQueue.push(
        this.studentsService.assignUniversityToStudent(student._id, university),
      );
      i++;
    }
    await Promise.all(universitiesPromiseQueue);
    return Promise.all(studentsPromiseQueue);
  }

  calculateScoreOfStudentsAndSort(
    students: StudentDocument[],
    articles: PageViewMetricItemArticles[],
  ): StudentWithExamScore[] {
    const studentsWithScores = students.map<StudentWithExamScore>((student) => {
      const examScore = this.calculateExamScore(
        student.firstName + ' ' + student.lastName,
        articles,
      );
      return Object.assign(student, { examScore });
    });

    return studentsWithScores.sort((a, b) => b.examScore - a.examScore);
  }

  async startExamAndPlaceStudents(examDate: Date): Promise<StudentDocument[]> {
    const articles = await this.wikipediaService.getMostViewedArticlesOfTheDate(
      examDate,
    );
    await Promise.all([
      this.universitiesService.removeStudentFromAllUniversities(),
      this.studentsService.removeUniversityFromAllStudents(),
    ]);

    const students = await this.studentsService.getStudents();

    const sortedStudentsWithScores = this.calculateScoreOfStudentsAndSort(
      students,
      articles,
    );

    return this.placeStudents(sortedStudentsWithScores);
  }
}
