const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { HttpCode } = require('./helpers/constans');

const logger = require('morgan');
const cors = require('cors');
const path = require('path');

const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');
const app = express();

app.set('views', path.normalize('./views'));
app.set('view engine', 'ejs');

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 10000 }));
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  handler: (req, res, next) => {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      data: 'Bad request',
      message: 'Too many requests, please try again later.',
    });
  },
});
app.use('/api/', apiLimiter);

app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
