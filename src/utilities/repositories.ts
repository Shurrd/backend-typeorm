import { User } from '../entities/User';
import { Transaction } from '../entities/Transaction';
import { AppDataSource } from '../data-source';

export const userRepo = AppDataSource.getRepository(User);
export const transactionRepo = AppDataSource.getRepository(Transaction);
