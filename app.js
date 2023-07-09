const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

const {
  MONGODB_URL = 'mongodb://127.0.0.1:27017/mestodb',
  PORT = 3000 || 4000,
} = process.env;

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
});

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '64a94cc989e843e8393ecfb3',
  };

  res.status(404).send({
    message: 'not found',
  });

  next();
});

// app.use((req, res, next) => {
//   const error = new Error('Not Found');
//   error.status = 404;
//   next(error);
// });

app.use(bodyParser.json());
userRoutes(app);
cardRoutes(app);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
