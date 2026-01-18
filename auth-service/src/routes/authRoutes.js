import express from 'express';
import authController from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/profile', authMiddleware, authController.getUserProfile);
router.get('/getTokenData', authMiddleware, authController.getTokenData);

export default router;
