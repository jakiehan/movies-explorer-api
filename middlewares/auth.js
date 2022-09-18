const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const { NODE_ENV, JWT_SECRET_MOVIES } = process.env;

const { devConfig } = require('../utils/constants');

const { JWT_SECRET_DEV } = devConfig;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return new Unauthorized('Токен не передан или передан не в том формате.');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_MOVIES : JWT_SECRET_DEV);
  } catch (err) {
    throw new Unauthorized('Переданный токен некорректен.');
  }

  req.user = payload;

  next();
};
