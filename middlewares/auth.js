const jwt = require('jsonwebtoken');
const {
  codeError, messageError,
} = require('../errors/errors');

const { JWT_SECRET = 'test-secret' } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    res.status(codeError.UNAUTHORIZED).send({ message: messageError.UnauthorizedError });
  }
};

module.exports = {
  auth,
};
