import { Module } from '@nestjs/common';

import { RedisService } from './redis.service';
import { redisClientFactory } from './redis.factory';
import { RedisRepository } from './redis.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [redisClientFactory, RedisRepository, RedisService],

  exports: [RedisService],
})
export class RedisModule {}
