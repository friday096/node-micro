import express from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../services/productService.js';
import authenticateRequest from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateRequest, createProduct);
router.get('/', authenticateRequest, getProducts);
router.get('/:id', authenticateRequest, getProductById);
router.put('/:id', authenticateRequest, updateProduct);
router.delete('/:id', authenticateRequest, deleteProduct);

export default router;
