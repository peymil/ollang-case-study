import { Module } from '@nestjs/common';
import { WikipediaService } from './wikipedia.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://wikimedia.org/api/rest_v1',
    }),
  ],
  exports: [WikipediaService],
  providers: [WikipediaService],
})
export class WikipediaModule {}
