import express from 'express';
import { signUp } from '../controllers/auth/signup';

const router = express.Router();

router.post('/api/v1/signup', signUp);

export { router as authRouter };
