import { NextFunction, Request, Response } from 'express';
import GlobalError from 'src/utilities/globalErrorHandler';

const globalError = (
  error: GlobalError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};

export default globalError;
