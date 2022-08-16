import { Request, Response } from 'express';
import { UserParams, CreditDTO, CustomRequest } from 'types';
import { creditService } from '../services';

const addCredit = async (
  req: Request<
    UserParams,
    Record<string, unknown>,
    CreditDTO,
    Record<string, unknown>
  >,
  res: Response
) => {
  const userId = req.params.id || 1;
  const creditDTO = req.body;
  await creditService.addCredit(Number(userId), creditDTO);
  res.status(200).json({ message: 'credit added' });
};

const useCredit = async (
  req: Request<
    UserParams,
    Record<string, unknown>,
    CreditDTO,
    Record<string, unknown>
  >,
  res: Response
) => {
  const userId = req.params.id || 1;
  const creditDTO = req.body;
  await creditService.useCredit(Number(userId), creditDTO);
  res.status(200).json({ message: 'credit used' });
};

const getAvailableCredit = async (
  req: Request<
    UserParams,
    Record<string, unknown>,
    CreditDTO,
    Record<string, unknown>
  >,
  res: Response
) => {
  const userId = req.params.id || 1;
  const creditDTO = req.body;
  const validCredits = await creditService.getAvailableCredit(
    Number(userId),
    creditDTO
  );
  res.status(200).json({ data: validCredits });
};

const refundCredit = async (
  req: Request<
    UserParams,
    Record<string, unknown>,
    CreditDTO,
    Record<string, unknown>
  >,
  res: Response
) => {
  const userId = req.params.id || 1;
  const creditDTO = req.body;
  await creditService.refundCredit(Number(userId), creditDTO);
  res.status(200).json({ message: 'credit refunded' });
};

export default {
  addCredit,
  useCredit,
  getAvailableCredit,
  refundCredit,
};
