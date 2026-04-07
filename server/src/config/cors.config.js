const cors = require('cors');

const corsOptions = {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true
};

module.exports = cors(corsOptions);