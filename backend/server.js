const express = require('express');
const connectDB = require('./database/db');

const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded());

module.exports = app;
