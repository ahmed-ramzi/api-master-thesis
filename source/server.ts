import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import mainRoute from './routes/';

const NAMESPACE = 'Server';
const router = express();

/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});
/** Routes */
router.use('/', mainRoute);
router.use('/api', mainRoute);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Route not found');

    res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
