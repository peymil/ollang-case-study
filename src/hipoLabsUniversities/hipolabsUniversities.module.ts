import { Module } from '@nestjs/common';
import { HipolabsUniversitiesService } from './hipolabsUniversities.service';
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    HttpModule.register({
      //Hipolabs not supporting https
      baseURL: 'http://universities.hipolabs.com/',
    }),
  ],
  providers: [HipolabsUniversitiesService],
  exports: [HipolabsUniversitiesService]
})
export class HipolabsUniversitiesModule {}
