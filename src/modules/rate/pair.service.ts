import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

import { RateDTO } from '../types';

const map = {
  BTC: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
  BNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  ETH: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
  DOGE: '0xba2ae424d960c26247dd6c32edc70b295c744c43',
  USDT: '0x55d398326f99059ff775485246999027b3197955',
  TONCOIN: '0x76a797a59ba2c17726896976b7b3747bfd1d220f',
};

@Injectable()
export class PairService {
  constructor(private httpService: HttpService) {}

  async getBlockChainPair(data: RateDTO) {
    const url = process.env.BLOCKCHAIN_PROXY;

    const payload = {
      symbolA: map[data.symbolA],
      symbolB: map[data.symbolB],
    };

    const res = await lastValueFrom(this.httpService.post(url, payload));

    return res.data;
  }

  async getBinancePair(data: RateDTO) {
    const binanceApi = process.env.BINANCE_API_URL;

    const symbol = Object.values(data).join('');

    const url = `${binanceApi}/v3/ticker/price?symbol=${symbol}`;

    const res = await lastValueFrom(this.httpService.get(url));

    return res.data;
  }
}
