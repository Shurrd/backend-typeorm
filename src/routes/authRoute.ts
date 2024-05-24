import express from 'express';
import { signUp } from '../controllers/auth/signup';
import { login } from '../controllers/auth/login';

const router = express.Router();

router.post('/api/v1/signup', signUp);
router.post('/api/v1/login', login);

export { router as authRouter };
