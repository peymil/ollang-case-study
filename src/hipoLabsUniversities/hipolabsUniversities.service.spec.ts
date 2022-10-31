import { Test, TestingModule } from '@nestjs/testing';
import { HipolabsUniversitiesService } from './hipolabsUniversities.service';
import { HttpModule } from '@nestjs/axios';
import { hipolabUniversitiesApiUrl } from "./constant";

describe('UniversitiesService', () => {
  let service: HipolabsUniversitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          //Hipolabs not supporting https
          baseURL: hipolabUniversitiesApiUrl,
        }),
      ],
      providers: [HipolabsUniversitiesService],
    }).compile();

    service = module.get<HipolabsUniversitiesService>(HipolabsUniversitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return list of hipolabsUniversities', async () => {
    const universities = await service.getTurkishUniversities();
    expect(universities.length).toBeGreaterThan(0);
  });

  it('should return name of the university', async () => {
    const universities = await service.getTurkishUniversities();
    expect(universities[0].name).toBeDefined();
  });
});
