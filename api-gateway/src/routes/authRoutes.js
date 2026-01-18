import express from 'express';
import { loginUser, registerUser, getProfile, getTokenData } from '../services/authService.js';
import authenticateRequest from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/profile', authenticateRequest, getProfile);
router.get('/getTokenData', authenticateRequest, getTokenData);
export default router;
