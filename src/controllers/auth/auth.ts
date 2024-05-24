import { NextFunction, Request, Response } from 'express';
import GlobalError from '../../utilities/globalErrorHandler';
import * as jwt from 'jsonwebtoken';
import { userRepo } from '../../utilities/repositories';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let tokenId = '';
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    tokenId = req.headers.authorization.split(' ')[1];
  }
  if (!tokenId) {
    return next(new GlobalError('Please login to get access', 401));
  }

  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    throw new Error('JWT_SECRET_KEY is not defined');
  }

  let tokenDetail: jwt.JwtPayload & jwt.Jwt;
  try {
    tokenDetail = jwt.verify(tokenId, secretKey) as jwt.JwtPayload & jwt.Jwt;
  } catch (error) {
    return next(new GlobalError('Invalid token', 401));
  }

  const freshUser = await userRepo.findBy(tokenDetail.id);
  if (!freshUser) {
    return next(
      new GlobalError(
        'The user belonging to this token does no longer exist',
        401
      )
    );
  }

  (req as AuthenticatedRequest).user = freshUser;
  next();
};
