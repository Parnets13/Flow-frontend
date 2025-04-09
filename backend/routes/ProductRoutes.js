import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/ProductController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Routes
router.post('/', upload.single('mainImage'), createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', upload.single('mainImage'), updateProduct);
router.delete('/:id', deleteProduct);

export default router;