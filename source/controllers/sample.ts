import { Request, Response, NextFunction, response } from 'express';
import logging from '../config/logging';

const NAMESPACE = 'Sample Controller';
const sampleHealthCheck = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Sample test route called');

    return res.status(200).json({
        message: 'Hello World'
    });
};

export default { sampleHealthCheck };
