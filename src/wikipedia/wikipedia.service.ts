import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { PageViewMetricResponse } from './types/PageViewMetricResponse';

@Injectable()
export class WikipediaService {
  constructor(private readonly httpService: HttpService) {}

  getMostViewedArticlesOfTheDate(date: Date) {
    return lastValueFrom(
      this.httpService
        .get<PageViewMetricResponse>(
          `/metrics/pageviews/top/tr.wikipedia/all-access/${date.getFullYear()}/${
            date.getMonth() + 1
          }/${date.getDate()}`,
        )
        .pipe(map((response) => response.data.items[0].articles)),
    );
  }
}
