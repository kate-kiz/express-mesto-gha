const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

function initCardRoutes(app) {
  app.get('/cards', (req, res) => getCards()
    .then((results) => res.send({ data: results }))
    .catch((error) => res.send(error)));

  app.delete('/cards/:cardId', (req, res) => {
    const { cardId } = req.params;
    // console.log(cardId);
    return deleteCard(cardId)
      .then((card) => {
        if (!card) {
          res.status(404).send({ message: 'Карточка с указанным _id не найдена' });
        } else {
          res.send({ data: card });
        }
      })
      .catch((error) => {
        if (error.name === 'ValidationError' || error.name === 'CastError') {
          res.status(400).send({ message: 'Некорректный _id карточки' });
        } else {
          res.status(500).send(error);
        }
      });
  });

  app.post('/cards', (req, res) => {
    // console.log(req.body);
    const { name, link } = req.body;
    const userId = req.user._id;
    return createCard({ name, link, userId })
      .then((card) => res.status(201).send({ data: card }))
      .catch((error) => {
        if (error.name === 'ValidationError' || error.name === 'CastError') {
          res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' });
        } else {
          res.status(500).send(error);
        }
      });
  });

  app.put('/cards/:cardId/likes', (req, res) => {
    // console.log(req.params);
    const { cardId } = req.params;
    return likeCard(cardId, req.user)
      .then((card) => {
        if (!card) {
          res.status(404).send({ message: 'Передан несуществующий _id карточки' });
        } else {
          res.send({ data: card });
        }
      })
      .catch((error) => {
        if (error.name === 'ValidationError' || error.name === 'CastError') {
          res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка' });
        } else {
          res.status(500).send(error);
        }
      });
  });

  app.delete('/cards/:cardId/likes', (req, res) => {
    // console.log(req.body);
    const { cardId } = req.params;
    return dislikeCard(cardId, req.user)
      .then((card) => {
        if (!card) {
          res.status(404).send({ message: 'Передан несуществующий _id карточки' });
        } else {
          res.send({ data: card });
        }
      })
      .catch((error) => {
        if (error.name === 'ValidationError' || error.name === 'CastError') {
          res.status(400).send({ message: 'Переданы некорректные данные для снятия лайка' });
        } else {
          res.status(500).send(error);
        }
      });
  });
}

module.exports = initCardRoutes;
