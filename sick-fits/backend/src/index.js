require('dotenv').config({
    path: 'variables.env'
});

const db = require('./db');
const createServer = require('./createServer');

const server = createServer();

server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL,
    }
}, deets => {
    console.log(`Server is not running on port: http://localhost:${deets.port}`);
});