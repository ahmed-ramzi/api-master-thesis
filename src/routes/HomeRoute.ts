import express from 'express';
import mainController from '../controllers/HomeController';

const router = express.Router();

router.get('/', mainController.welcomeMessage);

export = router;
