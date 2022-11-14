import express from 'express';
import ProductController from '../controllers/ProductController';

const router = express.Router();

router.get('/products', ProductController.getAllProducts);
router.post('/products/create', ProductController.createProduct);
router.post('/products/create/bulk', ProductController.createBulkProducts);

export = router;
