import { Router } from 'express';
import asyncWrap from '../async-wrap';
import { creditController } from '../controller';
const router = Router();

router.get('/', asyncWrap(creditController.getCredit));
//router.post('/', asyncWrap(budgetController.createBudget));
//router.patch('/', asyncWrap(budgetController.updateBudget));
//router.delete('/', asyncWrap(budgetController.deleteBudget));
export default router;
