import { Request, Response } from 'express';
import { User } from '../../entities/User';
import { AppDataSource } from '../../data-source';
import { userRepo } from '../../utilities/repositories';

export const users = async (req: Request, res: Response) => {
  const users = await userRepo.find();

  const response = users.map((item) => {
    const { password, ...response } = item;
    return response;
  });

  res.status(200).json({
    message: 'success',
    data: response,
  });
};
