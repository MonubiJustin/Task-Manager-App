const error = require('../middleware/error')
const tasks = require('../routes/tasks')
const users = require('../routes/users');
const morgan = require('morgan');
const express = require('express');
const path = require('path')
const cors = require('cors')

module.exports = function (app) {
    app.use(cors());
    app.use(express.json());
    app.use(morgan('tiny'));
    app.use('/api/v1/tasks', tasks);
    app.use('/api/v1/users', users);
    app.use(error);

    // server static files
    app.use(express.static(path.join(__dirname, '../public')));
}