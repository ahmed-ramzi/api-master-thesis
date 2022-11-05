import express from 'express';
import mainController from '../controllers/index';

const router = express.Router();

router.get('/', mainController.welcomeMessage);

export = router;
