const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookies = require('cookie-parser');
const { errors } = require('celebrate');

const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { handleErrors } = require('./middlewares/errors');
const NotFoundError = require('./errors/NotFoundError');
const {
  codeError, messageError,
} = require('./errors/errors');
const { registerValidation, loginValidation } = require('./middlewares/validation');

const {
  MONGODB_URL = 'mongodb://127.0.0.1:27017/mestodb',
  PORT = 3000 || 4000,
} = process.env;

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
});

const app = express();
app.use(cookies());
app.use(bodyParser.json());

// app.use(handleErrors);

app.post('/signin', loginValidation, login);
app.post('/signup', registerValidation, createUser);

app.use(auth);

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

// Подключаем мидлвару для обработки ошибок валидации
app.use(errors());

// app.use('/', (req, res) => res.status(codeError.NOT_FOUND).send({ message: messageError.notFoundError }));
app.use('/', (req, res, next) => {
  next(new NotFoundError(messageError.notFoundError));
});

app.use(handleErrors);
// app.use((error, res, req, next) => {
//   handleErrors(error, res, req, next);
// });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
