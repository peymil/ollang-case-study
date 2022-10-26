import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RandomUserModule } from './random-user/random-user.module';

@Module({
  imports: [RandomUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
