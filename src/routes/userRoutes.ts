import { Router } from 'express';
import * as userController from '../controllers/userController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/:id', authMiddleware, userController.getUserProfile);

export default router;
