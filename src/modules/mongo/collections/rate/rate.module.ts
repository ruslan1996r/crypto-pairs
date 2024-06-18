import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { RateSchema } from './rate.schema';
import { RateService } from './rate.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Rate', schema: RateSchema }])],
  providers: [RateService],
  exports: [RateService],
})
export class RateModule {}
