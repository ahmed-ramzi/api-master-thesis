import express from 'express';
import controller from '../controllers/sample';

const router = express.Router();

router.get('/hi', controller.sampleHealthCheck);

export = router;
