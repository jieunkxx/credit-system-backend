import { Router, Request, Response } from 'express';
import { asyncWrap } from '../async-wrap';
import { PathRouter } from '../class/common';
import * as type from 'types';
import { creditController } from '../controller';

class CreditRouter extends PathRouter {
  constructor() {
    const path = '/credit';
    const router = Router();
    super(path, router);
    router.post('/', asyncWrap(this.addCredit));
    router.patch('/use', asyncWrap(this.useCredit));
    router.get('/', asyncWrap(this.getAvailableCredit));
    router.patch('/refund', asyncWrap(this.refundCredit));
  }

  async addCredit(req: type.CustomRequest<type.CreditDTO>, res: Response) {
    await creditController.addCredit(req, res);
  }

  async useCredit(req: type.CustomRequest<type.CreditDTO>, res: Response) {
    await creditController.useCredit(req, res);
  }
  async getAvailableCredit(
    req: type.CustomRequest<type.CreditDTO>,
    res: Response
  ) {
    await creditController.getAvailableCredit(req, res);
  }
  async refundCredit(req: type.CustomRequest<type.CreditDTO>, res: Response) {
    await creditController.refundCredit(req, res);
  }
}

export default CreditRouter;
