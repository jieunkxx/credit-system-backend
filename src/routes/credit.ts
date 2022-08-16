import { Router, Request, Response } from 'express';
import { asyncWrapCredit } from '../async-wrap';
import { PathRouter } from '../class/common';
import * as type from 'types';
import { creditController } from '../controller';

// API
/**
 * @swagger
 * paths:
 *  /credit/{id}/add:
 *    post:
 *      tag:
 *      - credit
 *      description: add credit to user
 *      parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: integer
 *        description: "userId"
 *      - in: body
 *        name: creditDTO
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            date:
 *              type: Date
 *              example: '2022-08-15'
 *            value:
 *              type: integer
 *              example: 1
 *      responses:
 *        200:
 *          description: success
 *  /credit/{id}/use:
 *    patch:
 *      tag:
 *      - credit
 *      description: use credit if there is valid. used up from old
 *      parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: integer
 *        description: "userId"
 *      - in: body
 *        name: creditDTO
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            date:
 *              type: Date
 *              example: '2022-08-15'
 *            value:
 *              type: integer
 *              example: 1
 *      responses:
 *        200:
 *          description: success
 *  /credit/{id}/get:
 *    post:
 *      tag:
 *      - credit
 *      description: get available credit of user
 *      parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: integer
 *        description: "userId"
 *      - in: body
 *        name: creditDTO
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            date:
 *              type: Date
 *              example: '2022-08-15'
 *      responses:
 *        200:
 *          description: success
 *
 *  /credit/{id}/refund:
 *    patch:
 *      tag:
 *      - credit
 *      description: refund credit
 *      parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: integer
 *        description: "userId"
 *      - in: body
 *        name: creditDTO
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            date:
 *              type: Date
 *              example: '2022-08-15'
 *            value:
 *              type: integer
 *              example: 1
 *      responses:
 *        200:
 *          description: success
 */

class CreditRouter extends PathRouter {
  constructor() {
    const path = '/credit';
    const router = Router();
    super(path, router);
    router.post('/:id/add', asyncWrapCredit(this.addCredit));
    router.patch('/:id/use', asyncWrapCredit(this.useCredit));
    router.post('/:id/get', asyncWrapCredit(this.getAvailableCredit));
    router.patch('/:id/refund', asyncWrapCredit(this.refundCredit));
  }

  // REQUIRES:
  // MODIFIES: this
  // EFFECTS: add credit and date
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

  // MODIFIES: this
  // EFFECTS: decrement credit value by credit
  //          Has enough credit: current credit >= : return 1;
  //          REFUND PARTIALLY: return (credit - current credit);
  //          REFUND FAILED: return -1;
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

  // EFFECTS: return available credit by target date
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

  // MODIFIES: this
  // EFFECTS: return REFUND STATUS
  //          REFUND ALL: return 0;
  //          REFUND PARTIALLY: return (credit - current credit);
  //          REFUND FAILED: return -1;
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
