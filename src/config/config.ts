import dotenv from 'dotenv';

dotenv.config();
const env = process.env;

const SERVER_PORT = env.SERVER_PORT || 1337;
const SERVER_HOSTNAME = env.SERVER_HOSTNAME || 'localhost';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    server: SERVER
};

export default config;
