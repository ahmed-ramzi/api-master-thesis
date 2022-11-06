import express from 'express';
import mainController from '../controllers/home';

const router = express.Router();

router.get('/', mainController.welcomeMessage);

export = router;
