import express from 'express';
import ProductController from '../controllers/ProductController';

const router = express.Router();

router.post('/create', ProductController.createProduct);
router.post('/create/bulk', ProductController.createBulkProducts);
router.get('/get/products', ProductController.getAllProducts);

export = router;
