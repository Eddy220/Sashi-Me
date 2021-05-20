const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const { environment } = require('./config');
const isProduction = environment === 'production';
// initialize express app
const app = express();

// Enable Middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());



// Security Middleware
if (!isProduction) {
  app.use(cors());  // enable cors only in development
}
// helmet helps set a variety of headers to better secure your app
app.use(helmet({ contentSecurityPolicy: false }));
// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

app.use(routes); // Connect all the routes


module.exports = app;
