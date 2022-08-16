import { Router, Request, Response } from 'express';
import { asyncWrapCredit } from '../async-wrap';
import { PathRouter } from '../class/common';
import * as type from 'types';
import { creditController } from '../controller';

// API
/**
 * @swagger
 * paths:
 *  /:id/credit/add:
 *    post:
 *      tag:
 *      - credit
 *      description: add credit to user
 *      parameters:
 *      - in: params
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *          properties:
 *            id:
 *            example: 1
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
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: "credit added"
 *  /:id/credit/use:
 *    patch:
 *      tag:
 *      - credit
 *      description: use credit if there is valid. used up from old
 *      parameters:
 *      - in: params
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *          properties:
 *            id:
 *            example: 1
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
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: "credit added"
 *  /:id/credit/:
 *    get:
 *      tag:
 *      - credit
 *      description: get available credit
 *      parameters:
 *      - in: params
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *          properties:
 *            id:
 *            example: 1
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
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *                example: 1
 *              user_id:
 *                type: integer
 *                example: 1
 *              value:
 *                type: integer
 *                example: 1
 *              created_at:
 *                type: date
 *                example: '2022-08-15'
 *  /:id/credit/refund:
 *    patch:
 *      tag:
 *      - credit
 *      description: refund credit
 *      parameters:
 *      - in: params
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *          properties:
 *            id:
 *            example: 1
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
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: "credit refunded"
 */

class CreditRouter extends PathRouter {
  constructor() {
    const path = '/:id/credit';
    const router = Router();
    super(path, router);
    router.post('/add', asyncWrapCredit(this.addCredit));
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
