const codeSuccess = {
  OK: 200,
};

const codeCreated = {
  OK: 201,
};

const codeError = {
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
  NOT_FOUND: 404,
};

const messageSuccess = {
  okMessage: 'Действие выполнено.',
};

const messageError = {
  badDataError: 'Переданы некорректные данные.',
  defaultError: 'Ошибка по умолчанию.',
  notFoundError: 'Данные по указанному _id не найдены.',
};

const handleErrors = (res, error) => {
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    res.status(codeError.BAD_REQUEST).send({ message: messageError.badDataError });
    return;
  }
  res.status(codeError.SERVER_ERROR).send({ message: messageError.defaultError });
};

module.exports = {
  codeSuccess, codeCreated, codeError, messageSuccess, messageError, handleErrors,
};
