import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { UniversitySearchResponse } from './types/UniversitySearchResponse';

@Injectable()
export class UniversitiesService {
  constructor(private readonly httpService: HttpService) {}

  getTurkishUniversities() {
    return lastValueFrom(
      this.httpService
        .get<UniversitySearchResponse>('search', {
          params: { country: 'turkey' },
        })
        .pipe(map((response) => response.data)),
    );
  }
}
