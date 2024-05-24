import express, { NextFunction, Request, Response } from 'express';
import { authRouter } from './routes/authRoute';
import { transactionRouter } from './routes/transactionRoute';
import GlobalError from './utilities/globalErrorHandler';
import globalError from './middlewares/error';
import { AppDataSource } from './data-source';

import dotenv from 'dotenv';
import { userRouter } from './routes/userRoute';

const app = express();
dotenv.config();

app.use(express.json());
app.use(authRouter);
app.use(transactionRouter);
app.use(userRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const error = new GlobalError(
    `Can't find ${req.originalUrl} on the server!`,
    404
  );
  next(error);
});

app.use(globalError);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server now running on Port ${process.env.APP_PORT}`);
});

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((error) => console.log('Error Connecting to DB', error));
