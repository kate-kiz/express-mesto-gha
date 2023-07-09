const {
  getUsers, getUserById, createUser, updateAvatar, updateProfile,
} = require('../controllers/users');

function initUserRoutes(app) {
  app.get('/users', (req, res) => getUsers()
    .then((results) => res.send({ data: results }))
    .catch((error) => res.send(error)));

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    // console.log(userId);
    return getUserById(userId)
      .then((user) => {
        if (!user) {
          // res.status(404).send('Пользователь по указанному _id не найден');
          res.status(404).send({
            message: 'Пользователь по указанному _id не найден',
          });
        } else {
          res.send({ data: user });
        }
      })
      .catch((error) => {
        if (error.name === 'ValidationError') {
          res.status(400).send({ message: 'Некорректные данные пользователя' });
        } else {
          res.status(500).send(error);
        }
      });
  });

  app.post('/users', (req, res) => {
    // console.log(req.body);
    const { name, about, avatar } = req.body;
    return createUser({ name, about, avatar })
      .then((user) => res.status(201).send({ data: user }))
      .catch((error) => {
        if (error.name === 'ValidationError') {
          res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' });
        } else {
          res.status(500).send(error);
        }
      });
  });

  app.patch('/users/me/avatar', (req, res) => {
    // console.log(req.body);
    const userId = req.user._id;
    const { avatar } = req.body;
    return updateAvatar(userId, avatar)
      .then((user) => {
        if (!user) {
          res.status(404).send('Пользователь с указанным _id не найден');
        } else {
          res.send({ data: user });
        }
      })
      .catch((error) => {
        if (error.name === 'ValidationError') {
          res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара' });
        } else {
          res.status(500).send(error);
        }
      });
  });

  app.patch('/users/me', (req, res) => {
    // console.log(req.body);
    const userId = req.user._id;
    const { name, about } = req.body;
    // console.log(name, about);
    return updateProfile(userId, name, about)
      .then((user) => {
        if (!user) {
          res.status(404).send('Пользователь с указанным _id не найден.');
        } else {
          res.send({ data: user });
        }
      })
      .catch((error) => {
        if (error.name === 'ValidationError') {
          res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' });
        } else {
          res.status(500).send(error);
        }
      });
  });
}

module.exports = initUserRoutes;
