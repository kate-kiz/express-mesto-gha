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
  UNAUTHORIZED: 401,
  CONFLICT: 409,
  FORBIDDREN: 403,
};

const messageSuccess = {
  okMessage: 'Действие выполнено.',
};

const messageError = {
  badDataError: 'Переданы некорректные данные.',
  defaultError: 'Ошибка по умолчанию.',
  notFoundError: 'Данные по указанному _id не найдены.',
  UnauthorizedError: 'Неправильные почта или пароль',
  ForbiddenError: 'Введены некорректные данные',
  ConflictError: 'Пользователь с таким email уже существует',
};

// const handleErrors = (res, error) => {
//   // console.log('end');
//   // console.log(error.name);
//   // console.log(error.message);
//   if (error.name === 'ValidationError' || error.name === 'CastError') {
//     res.status(codeError.BAD_REQUEST).send({ message: messageError.badDataError });
//     return;
//   }
//   if (error.message === 'NotData') {
//     res.status(codeError.UNAUTHORIZED).send({ message: messageError.UnauthorizedError });
//     return;
//   }
//   if (error.message === 'UserNotFound') {
//     res.status(codeError.NOT_FOUND).send({ message: messageError.notFoundError });
//     return;
//   }
//   if (error.status === 403) {
//     res.status(codeError.FORBIDDREN).send({ message: messageError.ForbiddenError });
//     return;
//   }
//   if (error.message === 'Forbidden') {
//     res.status(codeError.FORBIDDREN).send({ message: messageError.ForbiddenError });
//     return;
//   }
//   if (error.code === 11000) {
//     res.status(codeError.CONFLICT).send({ message: messageError.ConflictError });
//     return;
//   }
//   res.status(codeError.SERVER_ERROR).send({ message: messageError.defaultError });
// };

module.exports = {
  codeSuccess,
  codeCreated,
  codeError,
  messageSuccess,
  messageError,
};
