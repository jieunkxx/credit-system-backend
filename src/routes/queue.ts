import { Router, Request, Response } from 'express';
import { asyncWrap } from '../async-wrap';
import { PathRouter } from '../class/common';
import { CustomRequest, QueueDTO } from '../types/types';
import { queueController } from '../controller';

class QueueRouter extends PathRouter {
  constructor() {
    const path = '/queue';
    const router = Router();
    super(path, router);
    router.post('/enqueue', asyncWrap(this.enqueue));
    router.delete('/dequeue', asyncWrap(this.dequeue));
    router.post('/pop', asyncWrap(this.pop));
    router.get('/getLength', asyncWrap(this.getLength));
  }

  async enqueue(req: Request, res: Response) {
    await queueController.enqueue(req, res);
  }
  async dequeue(req: Request, res: Response) {
    await queueController.dequeue(req, res);
  }
  async pop(req: CustomRequest<QueueDTO>, res: Response) {
    await queueController.pop(req, res);
  }
  async getLength(req: Request, res: Response) {
    await queueController.getLength(req, res);
  }
}

export default QueueRouter;
