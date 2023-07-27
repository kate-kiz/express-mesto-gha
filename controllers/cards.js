const Card = require('../models/card');
const { messageError } = require('../errors/errors');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((results) => res.send({ data: results }))
    .catch((error) => next(error));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const userId = req.user._id;
  Card.create({ name, link, owner: userId })
    .then((card) => res.send({ data: card }))
    .catch((error) => next(error));
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(messageError.notFoundError);
      }
      if (req.user._id === card.owner.toString()) {
        return card.deleteOne()
          .then((result) => (res.send({ data: result })))
          .catch((error) => next(error, req, res));
      }
      throw new ForbiddenError(messageError.ForbiddenError);
    })
    .catch((error) => next(error));
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError(messageError.notFoundError);
      } else {
        res.send({ data: card });
      }
    })
    .catch((error) => next(error));
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError(messageError.notFoundError);
      } else {
        res.send({ data: card });
      }
    })
    .catch((error) => next(error));
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
