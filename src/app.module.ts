import { Module } from '@nestjs/common';
import { RandomUserModule } from './random-user/random-user.module';
import { StudentsModule } from './students/students.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UniversitiesModule } from './universities/universities.module';
import { ExamModule } from './exam/exam.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import RootConfig from './config/root.config';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, load: [RootConfig] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        console.log('uri', config.get('mongoose.uri'));
        return config.get('mongoose');
      },
    }),
    RandomUserModule,
    UniversitiesModule,
    StudentsModule,
    ExamModule,
  ],
})
export class AppModule {}
