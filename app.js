const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const users = require('./routes/users');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();


app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true});

app.use('/api/v1/users', users);

module.exports = app;
