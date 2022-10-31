import { Test, TestingModule } from '@nestjs/testing';
import { RandomUserService } from './random-user.service';
import { HttpModule } from '@nestjs/axios';
import {  randomUserApiUrl } from "./constant";

describe('RandomUserService', () => {
  let service: RandomUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          baseURL: randomUserApiUrl,
        }),
      ],
      providers: [RandomUserService],
    }).compile();

    service = module.get<RandomUserService>(RandomUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return 10 users', async () => {
    const users = await service.getNUser(10);

    expect(users.results.length).toBe(10);
  });
  it('should have name field', async () => {
    const users = await service.getNUser(1);
    const nameObj = users.results[0]?.name;
    expect(nameObj?.last).toBeDefined();
    expect(nameObj?.first).toBeDefined();
    expect(nameObj?.title).toBeDefined();
  });
});
