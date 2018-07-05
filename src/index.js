const app = require('./config/express');
const {
    port,
    env
} = require('./config/vars');

// listen to requests
app.listen(port, () => console.info(`server started on port ${port} (${env})`));

module.exports = app;