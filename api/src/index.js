const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const compression = require('compression');
const { connect } = require('mongoose');
const passport = require('passport');

// initialize app with express;
const app = express();
// initialize public directory
const pubDir = path.join(__dirname, '../storage');

// define application's config;
const { PORT, DB } = require('./configs/env.config');

// app middlewares requirements;
app.use(cors());
app.use(logger('dev'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
require('./middlewares/passport')(passport);
// serve the static files;
app.use(express.static(pubDir));

// app endpoints;
app.use('/api/v1/articles', require('./routes/article.route'));
app.use('/api/v1/auth', require('./routes/auth.route'));
app.use('/api/v1/info', require('./routes/info.route'));
app.use('/api/v1/messages', require('./routes/message.route'));
app.use('/api/v1/patients', require('./routes/patient.route'));
app.use('/api/v1/portfolios', require('./routes/portfolio.route'));
app.use('/api/v1/statistics', require('./routes/statistic.route'));
app.use('/api/v1/users', require('./routes/user.route'));
app.use('/api/v1/residences', require('./routes/residence.route'));

// create test user in db on startup if required
const createTestUser = require('../utils/create-test-user');
createTestUser();

// define application start function;
const startApp = () => {
  try {
    const dbConnect = connect(DB, {
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (dbConnect) {
      console.log(`...Database connection succeed`);
    }

    app.listen(PORT);

    console.log(`...Server started in ${process.env.NODE_ENV} mode`);
    console.log(
      `...Listening on port: ${PORT}\n...Serving statics in: ${pubDir}\n`
    );
  } catch (ex) {
    console.log(ex);
  }
};

// Start application;
startApp();
