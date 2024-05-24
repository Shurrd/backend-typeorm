import * as jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (payload: any) => {
  return jwt.sign(payload, `${process.env.JWT_SECRET_KEY}`, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
