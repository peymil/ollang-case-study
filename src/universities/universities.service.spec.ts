import { Test, TestingModule } from '@nestjs/testing';
import { UniversitiesService } from './universities.service';
import { HttpModule } from '@nestjs/axios';

describe('UniversitiesService', () => {
  let service: UniversitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          //Hipolabs not supporting https
          baseURL: 'http://universities.hipolabs.com/',
        }),
      ],
      providers: [UniversitiesService],
    }).compile();

    service = module.get<UniversitiesService>(UniversitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return list of universities', async () => {
    const universities = await service.getTurkishUniversities();
    expect(universities.length).toBeGreaterThan(0);
  });

  it('should return name of the university', async () => {
    const universities = await service.getTurkishUniversities();
    expect(universities[0].name).toBeDefined();
  });
});
