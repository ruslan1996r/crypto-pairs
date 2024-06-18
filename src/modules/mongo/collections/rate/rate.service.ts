import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IRateSchema, RateSchemaDTO } from './rate.schema';

@Injectable()
export class RateService {
  constructor(
    @InjectModel('Rate') private readonly rateModel: Model<IRateSchema>,
  ) {}

  async create(rateDto: RateSchemaDTO): Promise<IRateSchema> {
    const createdRate = new this.rateModel({
      ...rateDto,
    });
    return createdRate.save();
  }

  async findAll(): Promise<IRateSchema[]> {
    return this.rateModel.find().exec();
  }
}
