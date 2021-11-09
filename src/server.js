'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('../src/auth/error-handlers/500');
const notFound = require('../src/auth/error-handlers/404.js');
const authRoutes = require('../src/auth/routes/router');
const apiRoutes = require('../src/auth/routes/v2');
const router = require('../src/auth/routes/v1');
// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);
app.use(apiRoutes);
app.use('/api/v1',router);
app.use('/api/v2',apiRoutes);
// Catchalls
app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};