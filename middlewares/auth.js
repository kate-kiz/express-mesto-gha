const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const {
  messageError,
} = require('../errors/errors');

const { JWT_SECRET = 'test-secret' } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    next(new UnauthorizedError(messageError.UnauthorizedError));
  }
};

module.exports = {
  auth,
};
