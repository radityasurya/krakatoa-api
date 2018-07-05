const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('../api/routes/v1');
const {
    logs
} = require('./vars');

const app = express();

// request logging. dev: console | production: file
app.use(morgan(logs));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Use middleware to set the default Content-Type
app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    next();
});

// mount api v1 routes
app.use('/v1', routes);

app.get('/', (req, res) => {
    res.send(JSON.stringify({
        name: 'Krakatoa API',
        version: process.env.VERSION
    }));
})

module.exports = app;