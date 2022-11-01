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
    for (let j = 0; j < studentsWithScores.length; j += 5) {
      const university =
        await this.universitiesService.getUniversityByPlacement(
          Math.floor(j / 5) + 1,
        );
      if (!university) break;
      const students = studentsWithScores.slice(j, j + 5);
      studentsPromiseQueue.push(
        this.studentsService.assignUniversityToStudents(
          students.map(({ _id }) => _id),
          university,
        ),
      );
      universitiesPromiseQueue.push(
        this.universitiesService.assignStudentsToUniversity(
          university._id,
          students,
        ),
      );
    }

    await Promise.all(universitiesPromiseQueue);
    return Promise.all(studentsPromiseQueue);
  }

  getStudents() {
    return this.studentsService.getStudents();
  }

  getArticlesOfDate(examDate: Date) {
    return this.wikipediaService.getMostViewedArticlesOfTheDate(examDate);
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

  removePreviousAssignment() {
    return Promise.all([
      this.universitiesService.removeStudentFromAllUniversities(),
      this.studentsService.removeUniversityFromAllStudents(),
    ]);
  }
}
