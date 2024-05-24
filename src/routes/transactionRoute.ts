import express from 'express';
import {
  createTransaction,
  getTransactions,
} from '../controllers/transaction/transaction';
import { authentication } from '../controllers/auth/auth';

const router = express.Router();

router.post('/api/v1/transaction', authentication, createTransaction);
router.get('/api/v1/transactions', getTransactions);

export { router as transactionRouter };
