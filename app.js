var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var storesRouter = require('./routes/stores');
var usersRouter = require('./routes/users');

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/stores', storesRouter);
app.use('/users', usersRouter);

module.exports = app;
