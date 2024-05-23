import express from 'express';
import { users } from '../controllers/user/user';

const router = express.Router();

router.get('/api/v1/users', users);

export { router as userRouter };
