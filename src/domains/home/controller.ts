import { Request, Response, NextFunction } from 'express';
import logging from '../../config/logging';

const NAMESPACE = 'Home Controller';

const welcomeMessage = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Welcome route called');

    return res.status(200).json({
        message: 'Hello World'
    });
};

export default { welcomeMessage };
