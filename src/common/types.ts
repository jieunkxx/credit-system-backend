export interface CustomErrorSetup {
  statusCode: number;
  message: string;
}

export interface CustomError extends Error {
  statusCode?: number;
  message: string;
}

export type CreditId = string;
export interface item {
  credit: CreditId;
  date: Date;
}

export interface Credit {
  items: Array<item>;
  add(credit: CreditId, date: Date): void;
  use(credit: CreditId, date: Date): void;
  get_available(date: Date): Array<Credit>;
  refund(credit: CreditId, date: Date): void;
}

export interface Queue {
  enqueue(item: any): void;
  dequeue(): any;
  pop(index: number): any;
  get_length(): number;
}
