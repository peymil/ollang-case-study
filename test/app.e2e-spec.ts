import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RandomUserModule } from '../src/random-user/random-user.module';
import { UniversitiesModule } from '../src/universities/universities.module';
import { StudentsModule } from '../src/students/students.module';
import { ExamModule } from '../src/exam/exam.module';
import RootConfig from '../src/config/root.config';
import * as supertest from 'supertest';
import { StudentDocument } from '../src/students/schemas/student.schema';
import { UniversityDocument } from '../src/universities/schemas/university.schema';

describe('Exam', () => {
  let app: INestApplication;
  let server: any;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ cache: true, load: [RootConfig] }),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (config: ConfigService) => {
            return config.get('mongoose');
          },
        }),
        RandomUserModule,
        UniversitiesModule,
        StudentsModule,
        ExamModule,
      ],
    }).compile();
    app = moduleRef.createNestApplication();

    await app.init();
    server = app.getHttpServer();
  });

  it(`/POST students`, () => {
    return supertest(server).post('/students').expect(201);
  });

  it(`/GET students`, () => {
    return supertest(server)
      .get('/students')
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveLength(1000);
      });
  });

  it(`/GET students/:id`, async () => {
    const students: StudentDocument[] = (
      await supertest(server).get('/students')
    ).body;
    return supertest(server)
      .get('/students/' + students[0]._id)
      .expect(200);
  });

  it(`/POST universities`, () => {
    return supertest(server).post('/universities').expect(201);
  });

  it(`/GET universities`, () => {
    return supertest(server)
      .get('/universities')
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBeGreaterThan(0);
      });
  });

  it(`/GET startExam`, async () => {
    const ISODate = new Date("2022/01/01")
      .toISOString()
      .split('T')[0];
    // call startexam twice beacuse we need to check if students inserted twice to the university
    await supertest(server)
      .get('/startExam')
      .query({ examDate: ISODate })
      .expect(200);

    await supertest(server)
      .get('/startExam')
      .query({ examDate: ISODate })
      .expect(200);

    const universities: UniversityDocument[] = (
      await supertest(server).get('/universities')
    ).body;

    const firstUniversityIndex = universities.findIndex(
      ({ placement }) => placement === 1,
    );
    const firstUniversity = universities[firstUniversityIndex];
    expect(firstUniversity.students).toHaveLength(5);
  }, 30000);

  it(`/GET universities/:id/students`, async () => {
    const universities: UniversityDocument[] = (
      await supertest(server).get('/universities')
    ).body;
    const firstUniversityIndex = universities.findIndex(
      (university) => university.placement === 1,
    );
    return supertest(server)
      .get(
        '/universities/' + universities[firstUniversityIndex]._id + '/students',
      )
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveLength(5);
      });
  });

  it(`/DELETE universities`, async () => {
    await supertest(server).delete('/universities').expect(200);
    const universities: UniversityDocument[] = (
      await supertest(server).get('/universities')
    ).body;
    expect(universities).toHaveLength(0);
  });

  it(`/DELETE students`, async () => {
    await supertest(server).delete('/students').expect(200);
    const students: StudentDocument[] = (
      await supertest(server).get('/students')
    ).body;
    expect(students).toHaveLength(0);
  });

  afterAll(async () => {
    await app.close();
  });
});
