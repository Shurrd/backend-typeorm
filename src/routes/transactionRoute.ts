import express from 'express';
import {
  transaction,
  getTransactions,
} from '../controllers/transaction/transaction';

const router = express.Router();

router.post('/api/v1/transaction', transaction);
router.get('/api/v1/transactions', getTransactions);

export { router as transactionRouter };
