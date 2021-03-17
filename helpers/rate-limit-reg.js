const rateLimit = require('express-rate-limit');
const { HttpCode } = require('./constans');

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 2,
  handler: (req, res, next) => {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      data: 'Bad request',
      message: 'Слишком много регистраций. Не больше двух за час с одного IP',
    });
  },
});

module.exports = { createAccountLimiter };
