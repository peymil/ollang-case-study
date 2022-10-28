import { Test, TestingModule } from '@nestjs/testing';
import { ExamService } from './exam.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('ExamService', () => {
  let service: ExamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamService],
    })
      .useMocker((token) => {
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    service = module.get<ExamService>(ExamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate correct score', async () => {
    const articleMock = [
      { article: 'tette', rank: 1, views: 20 },
      {
        article: 'test',
        rank: 3,
        views: 10,
      },
      { article: 'asf', rank: 2, views: 100 },
    ];
    const score = service.calculateExamScore('test', articleMock);
    expect(score).toBe(2+3+1);
  });
});
