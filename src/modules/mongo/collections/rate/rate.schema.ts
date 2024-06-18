import { Schema, Document } from 'mongoose';

export const RateSchema = new Schema({
  SymbolA: String,
  SymbolB: String,
  BinancePair: String,
  PairAddressUni: String,
  Rate: Number,
  Timestamp: { type: Date, default: Date.now },
  IsCorrect: { type: Boolean, default: false },
});

export interface RateSchemaDTO {
  SymbolA: string;
  SymbolB: string;
  BinancePair: string;
  PairAddressUni: string;
  Rate: number;
  Timestamp: number;
  IsCorrect: boolean;
}

export interface IRateSchema extends RateSchemaDTO, Document {}
