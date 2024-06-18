import { Module } from '@nestjs/common';
import { PairService } from './pair.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [PairService],

  exports: [PairService],
})
export class PairModule {}
