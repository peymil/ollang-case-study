import { Module } from '@nestjs/common';
import { RandomUserService } from './random-user.service';
import { HttpModule } from "@nestjs/axios";
import { randomUserApiUrl } from "./constant";

@Module({
  imports: [
    HttpModule.register({
      baseURL: randomUserApiUrl,
    }),
  ],
  providers: [RandomUserService],
  exports: [RandomUserService],
})
export class RandomUserModule {}
