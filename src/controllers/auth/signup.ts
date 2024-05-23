import { NextFunction, Request, Response } from 'express';
import { User } from '../../entities/User';
import { AppDataSource } from '../../data-source';

import * as bcrypt from 'bcrypt';
import { createUserSchema } from '../../utilities/validationSchema';
import GlobalError from '../../utilities/globalErrorHandler';

const SALT_ROUNDS = 10;

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userRepo = AppDataSource.getRepository(User);

    const { firstName, lastName, email, gender, userType, password } =
      await createUserSchema.validateAsync({ ...req.body });

    const newUser = new User();
    newUser.first_name = firstName;
    newUser.last_name = lastName;
    newUser.email = email;
    newUser.password = await bcrypt.hash(password, SALT_ROUNDS);
    newUser.gender = gender;
    newUser.user_type = userType;

    await userRepo.save(newUser);

    const userResponse: Partial<User> = { ...newUser };

    delete userResponse.password;

    res.status(200).json({
      message: 'success',
      data: userResponse,
    });
  } catch (error) {
    console.log(error);
  }
};
