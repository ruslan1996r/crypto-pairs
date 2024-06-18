export interface IRate {
  rate: number;
  timestampt: number;
}

export interface RateDTO {
  symbolA: string;
  symbolB: string;
}

export interface RateHistoryDTO {
  symbolA: string;
  symbolB: string;
  binancePair: string;
  pairAddressUni: string;
  rate: number;
  timestamp: number;
  isCorrect: boolean;
}
