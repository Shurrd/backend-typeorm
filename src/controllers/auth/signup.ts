import { NextFunction, Request, Response } from 'express';
import { User } from '../../entities/User';

import * as bcrypt from 'bcrypt';
import { createUserSchema } from '../../utilities/validationSchema';
import { userRepo } from '../../utilities/repositories';
import { generateToken } from '../../utilities/token';

const SALT_ROUNDS = 10;

interface UserResponse extends User {
  token: string;
}

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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

    const userResponse: Partial<UserResponse> = { ...newUser };

    delete userResponse.password;

    userResponse.token = generateToken({
      id: userResponse.id,
    });

    res.status(200).json({
      message: 'success',
      data: userResponse,
    });
  } catch (error) {
    console.log(error);
    next(
      res.status(400).json({
        message: error.message,
      })
    );
  }
};
