import { Module } from '@nestjs/common';
import { RandomUserService } from './random-user.service';
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://randomuser.me/api/',
    }),
  ],
  providers: [RandomUserService],
  exports: [RandomUserService],
})
export class RandomUserModule {}
