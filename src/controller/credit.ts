import { Request, Response } from 'express';
import { CreditDTO, CustomRequest } from 'types';
import { creditService } from '../services';

const addCredit = async (req: CustomRequest<CreditDTO>, res: Response) => {
  const userId = req.user?.id;
  const creditDTO = req.body;
  await creditService.addCredit(userId as number, creditDTO);
  res.status(200).json({ message: 'credit added' });
};

const useCredit = async (req: CustomRequest<CreditDTO>, res: Response) => {
  const userId = req.user?.id;
  const creditDTO = req.body;
  await creditService.useCredit(userId as number, creditDTO);
  res.status(200).json({ message: 'credit used' });
};

const getAvailableCredit = async (
  req: CustomRequest<CreditDTO>,
  res: Response
) => {
  const userId = req.user?.id;
  const creditDTO = req.body;
  const validCredits = await creditService.getAvailableCredit(
    userId as number,
    creditDTO
  );
  res.status(200).json({ data: validCredits });
};

const refundCredit = async (req: CustomRequest<CreditDTO>, res: Response) => {
  const userId = req.user?.id;
  const creditDTO = req.body;
  await creditService.refundCredit(userId as number, creditDTO);
  res.status(200).json({ message: 'credit refunded' });
};

export default {
  addCredit,
  useCredit,
  getAvailableCredit,
  refundCredit,
};
