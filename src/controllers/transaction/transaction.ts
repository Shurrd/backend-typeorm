import { NextFunction, Request, Response } from 'express';
import { Transaction } from '../../entities/Transaction';
import { AppDataSource } from '../../data-source';
import { transactionRepo, userRepo } from '../../utilities/repositories';
import GlobalError from '../../utilities/globalErrorHandler';

interface AuthenticatedRequest extends Request {
  user?: any;
}

interface TransactionResponse extends Transaction {
  created_by: number;
}

// CREATE TRANSACTIONS

export const createTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { transactionType, transactionAmount } = req.body;
  const userId = (req as AuthenticatedRequest).user.id;

  if (
    !['success', 'failed', 'refunded', 'cancelled'].includes(transactionType)
  ) {
    next(new GlobalError('Invalid Transaction Type', 400));
  }

  const transaction = new Transaction();
  transaction.transaction_amount = transactionAmount;
  transaction.transaction_type = transactionType;

  await transactionRepo.save(transaction);

  const transactionResponse: Partial<TransactionResponse> = { ...transaction };
  transactionResponse.created_by = userId;
  console.log(transactionResponse);

  if (!transaction) {
    next(new GlobalError('Failed to create transactions', 401));
  }
  return res.status(200).json({
    message: 'success',
    data: transactionResponse,
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
