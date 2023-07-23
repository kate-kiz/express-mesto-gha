const Card = require('../models/card');

const { handleErrors } = require('../errors/errors');

const getCards = (req, res) => {
  Card.find({})
    .then((results) => res.send({ data: results }))
    .catch((error) => handleErrors(res, error));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const userId = req.user._id;
  Card.create({ name, link, owner: userId })
    .then((card) => res.send({ data: card }))
    .catch((error) => handleErrors(res, error));
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new Error('UserNotFound');
      }
      if (req.user._id === card.owner.toString()) {
        card.deleteOne();
        res.send({ data: card });
      } else {
        throw new Error('Forbidden');
      }
    })
    .catch((error) => handleErrors(res, error));
};

const likeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new Error('UserNotFound');
      } else {
        res.send({ data: card });
      }
    })
    .catch((error) => handleErrors(res, error));
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new Error('UserNotFound');
      } else {
        res.send({ data: card });
      }
    })
    .catch((error) => handleErrors(res, error));
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
