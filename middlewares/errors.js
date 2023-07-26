const { codeError, messageError } = require('../errors/errors');

const handleErrors = (error, req, res, next) => {
  const { statusCode = codeError.SERVER_ERROR, message } = error;

  if (error.code === 11000) {
    res.status(codeError.CONFLICT).send({ message: messageError.ConflictError });
    return;
  }
  if (statusCode === codeError.SERVER_ERROR) {
    res.status(codeError.SERVER_ERROR).send({ message: messageError.defaultError });
    return;
  }
  res.status(statusCode).send({ message });

  next();
  // if (statusCode === codeError.SERVER_ERROR) {
  //   res.status(statusCode).send({ message: messageError.defaultError });
  //   return;
  // }
  // res.status(statusCode).send({ message });
};

module.exports = {
  handleErrors,
};
