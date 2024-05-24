import { Request, Response } from 'express';
import { Transaction } from '../../entities/Transaction';
import { AppDataSource } from '../../data-source';
import { transactionRepo } from '../../utilities/repositories';

// CREATE TRANSACTIONS
export const createTransaction = async (req: Request, res: Response) => {
  const { transactionType, transactionAmount } = req.body;

  if (
    !['success', 'failed', 'refunded', 'cancelled'].includes(transactionType)
  ) {
  }
  const transaction = new Transaction();
  transaction.transaction_amount = transactionAmount;
  transaction.transaction_type = transactionType;

  await transactionRepo.save(transaction);

  if (!transaction) {
    console.log('Failed to create transactions');
  }
  return res.status(200).json({
    message: 'success',
    data: transaction,
  });
};

// Get all Transactions

export const getTransactions = async (req: Request, res: Response) => {
  const transactionRepo = AppDataSource.getRepository(Transaction);

  const transactions = await transactionRepo.find();

  return res.status(200).json({
    message: 'success',
    data: transactions,
  });
};
