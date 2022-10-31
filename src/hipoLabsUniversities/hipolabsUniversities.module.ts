import { Module } from '@nestjs/common';
import { HipolabsUniversitiesService } from './hipolabsUniversities.service';
import { HttpModule } from "@nestjs/axios";
import { hipolabUniversitiesApiUrl } from "./constant";

@Module({
  imports: [
    HttpModule.register({
      //Hipolabs not supporting https
      baseURL: hipolabUniversitiesApiUrl,
    }),
  ],
  providers: [HipolabsUniversitiesService],
  exports: [HipolabsUniversitiesService]
})
export class HipolabsUniversitiesModule {}
