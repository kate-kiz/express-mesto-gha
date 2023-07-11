const Card = require('../models/card');

const {
  codeSuccess, codeCreated, codeError, messageError, handleErrors,
} = require('../errors/errors');

const getCards = (req, res) => {
  Card.find({})
    .then((results) => res.status(codeSuccess.OK).send({ data: results }))
    .catch(() => res.status(codeError.SERVER_ERROR).send({ message: messageError.defaultError }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const userId = req.user._id;
  Card.create({ name, link, owner: userId })
    .then((card) => res.status(codeCreated.OK).send({ data: card }))
    .catch((error) => handleErrors(res, error));
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        res.status(codeError.NOT_FOUND).send({ message: messageError.notFoundError });
      } else {
        res.send({ data: card });
      }
    })
    .catch((error) => handleErrors(res, error));
};

const likeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(codeError.NOT_FOUND).send({ message: messageError.notFoundError });
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
        res.status(codeError.NOT_FOUND).send({ message: messageError.notFoundError });
      } else {
        res.send({ data: card });
      }
    })
    .catch((error) => handleErrors(res, error));
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
