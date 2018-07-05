const path = require('path');

// import .env
require('dotenv-safe').load({
    path: path.join(__dirname, '../../.env')
});

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    version: process.env.VERSION,
    logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
};