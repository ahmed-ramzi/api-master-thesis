import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';

const NAMESPACE = 'Welcome Controller';
const welcomeMessage = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Main route called');

    return res.status(200).json({
        message: 'Hello World, Welcome to my API',
        version: 'v1',
        author: 'Ahmed Ramzi Abdulkarm Muthana',
        student: 'Master',
        description: 'This is a project for my master thesis',
        supervisor: 'Doc. Ing. Vojtěch Merunka, Ph.D.',
        university: 'Czech University of Life Sciences Prague',
        department: 'Information Engineering',
        year: '2022/2023'
    });
};

export default { welcomeMessage };
