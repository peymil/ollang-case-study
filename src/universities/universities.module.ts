import { Module } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    HttpModule.register({
      //Hipolabs not supporting https
      baseURL: 'http://universities.hipolabs.com/',
    }),
  ],
  providers: [UniversitiesService],
  exports: [UniversitiesService]
})
export class UniversitiesModule {}
