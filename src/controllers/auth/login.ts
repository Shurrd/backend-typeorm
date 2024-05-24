import { NextFunction, Request, Response } from 'express';

import * as bcrypt from 'bcrypt';
import GlobalError from '../../utilities/globalErrorHandler';
import { userRepo } from '../../utilities/repositories';
import { generateToken } from '../../utilities/token';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new GlobalError('Please provide email and password', 400));
  }

  const response = await userRepo.findOne({
    where: { email },
  });

  if (!response || !(await bcrypt.compare(password, response.password))) {
    next(new GlobalError('Incorrect email or password', 401));
  } else {
    const token = generateToken({
      id: response.id,
    });
    console.log({ status: 'success', token, user: response });

    res.status(200).json({
      status: 'success',
      token,
    });
  }
};
