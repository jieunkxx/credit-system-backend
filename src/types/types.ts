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
  value: number;
  createdAt: Date;
}

export interface UserParams {
  id: string;
}
export interface CreditDTO {
  userId: number;
  value?: CreditValue;
  date: Date;
}

export interface CreditRouter {
  addCredit(
    req: CustomRequest<CreditDTO>,
    res: Response
  ): Promise<Response | void>;
  useCredit(
    req: CustomRequest<CreditDTO>,
    res: Response
  ): Promise<Response | void>;
  getAvailableCredit(
    req: CustomRequest<CreditDTO>,
    res: Response
  ): Promise<Response | void>;
  refundCredit(
    req: CustomRequest<CreditDTO>,
    res: Response
  ): Promise<Response | void>;
}
export interface Credit {
  //items: CreditItem;
  add(credit: CreditValue, createdAt: CreditCreatedAt): void;
  use(credit: CreditValue, date: Date): void;
  get_available(date: Date): CreditValue;
  refund(credit: CreditValue, date: Date): void;
}

export type QueueIndex = number;
export type QueueItemKey = Record<string, any>;
export type QueueValue = any;
export type QueueItem<T> = T;

export type QueueArrayItem = any;
export type QueueArray = Array<QueueArrayItem>;

export interface QueueDTO {
  index: number;
  item: any;
}

export interface Queue<T> {
  enqueue(item: T): void;
  dequeue(): T;
  pop(index: number): T;
  get_length(): number;
}
