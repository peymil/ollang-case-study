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
import {
  StudentDocument,
} from '../src/students/schemas/student.schema';
import { UniversityDocument } from '../src/universities/schemas/university.schema';

describe('Cats', () => {
  let app: INestApplication;

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
  });

  it(`/POST students`, () => {
    return supertest(app.getHttpServer()).post('/students').expect(201);
  });

  it(`/GET students`, () => {
    return supertest(app.getHttpServer()).get('/students').expect(200);
  });

  it(`/GET students/:id`, async () => {
    const students: StudentDocument[] = (
      await supertest(app.getHttpServer()).get('/students')
    ).body;
    console.log(students[0]._id);
    return supertest(app.getHttpServer())
      .get('/students/' + students[0]._id)
      .expect(200);
  });

  it(`/POST universities`, () => {
    return supertest(app.getHttpServer()).post('/universities').expect(201);
  });

  it(`/GET universities`, () => {
    return supertest(app.getHttpServer()).get('/universities').expect(200);
  });

  it(`/GET universities`, () => {
    return supertest(app.getHttpServer()).get('/universities').expect(200);
  });

  it(`/GET startExam`, () => {
    const yesterdayISODate = new Date(+new Date() - 1000 * 60 * 60 * 24)
      .toISOString()
      .split('T')[0];
    return supertest(app.getHttpServer())
      .get('/startExam')
      .query({ examDate: yesterdayISODate })
      .expect(200);
  });

  it(`/GET universities/:id/students`, async () => {
    const universities: UniversityDocument[] = (
      await supertest(app.getHttpServer()).get('/students')
    ).body;
    const firstUniversityIndex = universities.findIndex(
      (university) => university.placement === 1,
    );
    return supertest(app.getHttpServer())
      .get(
        '/universities/' + universities[firstUniversityIndex]._id + '/studnets',
      )
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
