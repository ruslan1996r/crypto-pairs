import { Injectable } from '@nestjs/common';

import { RedisService } from './modules/redis/redis.service';
import { RateService } from './modules/mongo/collections/rate/rate.service';
import { PairService } from './modules/rate/pair.service';
import { IRate, RateDTO } from './modules/types';
import { IRateSchema } from './modules/mongo/collections/rate/rate.schema';

@Injectable()
export class AppService {
  constructor(
    private redisService: RedisService,
    private rateService: RateService,
    private pairService: PairService,
  ) {}

  async getHistoryRates(): Promise<IRateSchema[]> {
    const historyRates = await this.rateService.findAll();

    return historyRates;
  }

  async getRate(data: RateDTO) {
    const key = this.getKey(data);
    const cachedRate = await this.redisService.getRate(key);

    if (cachedRate) {
      return cachedRate;
    }

    const rate = await this.getPairRate(data);
    const isCorrect = 100 - rate.rate > 10;

    await this.redisService.saveRate(key, rate);
    await this.rateService.create({
      SymbolA: data.symbolA,
      SymbolB: data.symbolB,
      BinancePair: key,
      PairAddressUni: key,
      Timestamp: rate.timestampt,
      Rate: rate.rate,
      IsCorrect: isCorrect,
    });

    return rate;
  }

  private async getPairRate(data: RateDTO): Promise<IRate> {
    const chainPair = await this.pairService.getBlockChainPair(data);
    const binancePair = await this.pairService.getBinancePair(data);

    const chainRate = chainPair.data;
    const binanceRate = binancePair.price;

    const rate = (chainRate * 100) / binanceRate;
    const timestampt = Date.now();

    return {
      rate,
      timestampt,
    };
  }

  private getKey(data: RateDTO): string {
    return Object.values(data).join('');
  }
}
