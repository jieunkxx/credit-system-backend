import { Request } from 'express';

export interface CustomErrorSetup {
  statusCode: number;
  message: string;
}

export interface CustomError extends Error {
  statusCode?: number;
  message: string;
}

export interface CustomRequest<T> extends Request {
  body: T;
  user?: DecodedToken;
}

export interface UserDB {
  id: number;
  user_name: string;
  password: string;
  created_at: Date;
}

export interface UserDTO {
  user_name: string;
  password: string;
}

export interface DecodedToken {
  id: number;
  iat: number;
  exp: number;
}

export type CreditId = string;
export type CreditValue = number;
export type CreditCreatedAt = Date;
export type CreditItemKey = Record<string, Date>;
export type CreditItem = Map<CreditItemKey, CreditValue>;

export interface CreditDB {
  id: number;
  user_id: number;
  value: CreditValue;
  createdAt: CreditCreatedAt;
}

export interface CreditDTO {
  value?: CreditValue;
  date: Date;
}

export interface Credit {
  //items: CreditItem;
  add(credit: CreditValue, createdAt: CreditCreatedAt): void;
  use(credit: CreditValue, date: Date): void;
  get_available(date: Date): CreditValue;
  refund(credit: CreditValue, date: Date): void;
}

export interface QueueDTO {
  index: number;
}
export interface Queue {
  enqueue(item: any): void;
  dequeue(): any;
  pop(index: number): any;
  get_length(): number;
}
