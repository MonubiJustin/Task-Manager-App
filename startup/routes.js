const error = require('../middleware/error')
const tasks = require('../routes/tasks')
const morgan = require('morgan');
const express = require('express');
const path = require('path')

module.exports = function (app) {
    app.use(express.json());
    app.use(morgan('tiny'));
    app.use('/api/v1/tasks', tasks);
    app.use(error);

    // server static files
    app.use(express.static(path.join(__dirname, '../public')));
}