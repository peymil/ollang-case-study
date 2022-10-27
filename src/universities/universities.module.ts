import { Module } from '@nestjs/common';
import { UniversitiesController } from './universities.controller';
import { UniversitiesService } from './universities.service';
import { HipolabsUniversitiesModule } from '../hipoLabsUniversities/hipolabsUniversities.module';
import { MongooseModule } from '@nestjs/mongoose';
import { University, UniversitySchema } from './schemas/university.schema';

@Module({
  imports: [
    HipolabsUniversitiesModule,
    MongooseModule.forFeature([
      { name: University.name, schema: UniversitySchema },
    ]),
  ],
  controllers: [UniversitiesController],
  providers: [UniversitiesService],
})
export class UniversitiesModule {}
