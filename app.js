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

  next();
});

app.use(bodyParser.json());
userRoutes(app);
cardRoutes(app);

app.use('/', (req, res) => res.status(404).send({ message: 'route not found' }));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
