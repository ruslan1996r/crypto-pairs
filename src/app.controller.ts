import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RateDTO } from './modules/types';
import { Throttle } from '@nestjs/throttler';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/history')
  @Throttle({ default: { limit: 1, ttl: 5000 } })
  getHistoryRates(): any {
    return this.appService.getHistoryRates();
  }

  @Post('/rate')
  getRate(@Body('data') data: RateDTO): any {
    return this.appService.getRate(data);
  }
}
