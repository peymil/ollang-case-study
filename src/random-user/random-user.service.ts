import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { RandomUserApiResponse } from './types/RandomUserApi';

@Injectable()
export class RandomUserService {
  constructor(private readonly httpService: HttpService) {}

  getNUser(n: number) {
    return lastValueFrom(
      this.httpService
        .get<RandomUserApiResponse>('', { params: { results: n } })
        .pipe(map((response) => response.data)),
    );
  }
}
