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
    const article = await service.getMostViewedArticleOfTheDate();
    expect(article.items[0].articles.length).toBeGreaterThan(0);
  });
  it('should return name of the article', async () => {
    const article = await service.getMostViewedArticleOfTheDate();
    expect(article.items[0].articles[0].article).toBeDefined();
  });
});
