import { Test, TestingModule } from '@nestjs/testing';
import { WikipediaService } from './wikipedia.service';
import { HttpModule } from '@nestjs/axios';

describe('WikipediaService', () => {
  let service: WikipediaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WikipediaService],
      imports: [
        HttpModule.register({
          baseURL: 'https://wikimedia.org/api/rest_v1',
        }),
      ],
    }).compile();

    service = module.get<WikipediaService>(WikipediaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return most viewed article of the date', async () => {
    const articles = await service.getMostViewedArticlesOfTheDate();
    expect(articles.length).toBeGreaterThan(0);
  });
  it('should return name of the article', async () => {
    const articles = await service.getMostViewedArticlesOfTheDate();
    expect(articles[0].article).toBeDefined();
  });
});
