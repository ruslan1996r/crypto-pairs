import { Inject, Injectable } from '@nestjs/common';

import { RedisPrefixEnum } from './redis.keys';
import { RedisRepository } from './redis.repository';

const expireTime = 60;

@Injectable()
export class RedisService {
  constructor(
    @Inject(RedisRepository) private readonly redisRepository: RedisRepository,
  ) {}

  async getRate(rateId: string): Promise<any | null> {
    const product = await this.redisRepository.get(
      RedisPrefixEnum.RATE,
      rateId,
    );
    return JSON.parse(product);
  }

  async saveRate(rateId: string, data: any): Promise<void> {
    await this.redisRepository.setWithExpiry(
      RedisPrefixEnum.RATE,
      rateId,
      JSON.stringify(data),
      expireTime,
    );
  }
}
