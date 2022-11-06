import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import mainRoute from './routes/HomeRoute';
import ProductRoute from './routes/ProductRoute';

const NAMESPACE = 'Server';
const app = express();

/** Parse the body of the request */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Rules of our API */
app.use((req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === process.env.ACCESS_TOKEN_SECRET) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    } else {
        return res.sendStatus(401);
    }
});
/** ROUTES */

// Home
app.use('/', mainRoute);
app.use('/api', mainRoute);
// Product
app.use('/product', ProductRoute);

/** END ROUTES */

/** Error handling */
app.use((req, res, next) => {
    const error = new Error('Route not found');
    const notAuthorized = new Error('Not Authorized');

    res.status(404).json({
        message: error.message
    });

    res.status(401).json({
        message: 'Not Authorized'
    });
    res.status(400).json({
        message: 'Malformed data'
    });
});

const httpServer = http.createServer(app);

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
