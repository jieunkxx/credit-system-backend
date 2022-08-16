import { Router, Request, Response } from 'express';
import { asyncWrapCredit } from '../async-wrap';
import { PathRouter } from '../class/common';
import * as type from 'types';
import { creditController } from '../controller';

class CreditRouter extends PathRouter {
  constructor() {
    const path = '/:id/credit';
    const router = Router();
    super(path, router);
    router.post('/', asyncWrapCredit(this.addCredit));
    router.patch('/use', asyncWrapCredit(this.useCredit));
    router.get('/', asyncWrapCredit(this.getAvailableCredit));
    router.patch('/refund', asyncWrapCredit(this.refundCredit));
  }

  async addCredit(
    req: Request<
      type.UserParams,
      Record<string, unknown>,
      type.CreditDTO,
      Record<string, unknown>
    >,
    res: Response
  ) {
    await creditController.addCredit(req, res);
  }

  async useCredit(
    req: Request<
      type.UserParams,
      Record<string, unknown>,
      type.CreditDTO,
      Record<string, unknown>
    >,
    res: Response
  ) {
    await creditController.useCredit(req, res);
  }
  async getAvailableCredit(
    req: Request<
      type.UserParams,
      Record<string, unknown>,
      type.CreditDTO,
      Record<string, unknown>
    >,
    res: Response
  ) {
    await creditController.getAvailableCredit(req, res);
  }
  async refundCredit(
    req: Request<
      type.UserParams,
      Record<string, unknown>,
      type.CreditDTO,
      Record<string, unknown>
    >,
    res: Response
  ) {
    await creditController.refundCredit(req, res);
  }
}

export default CreditRouter;
