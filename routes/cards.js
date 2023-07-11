const initCardRoutes = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

initCardRoutes.get('/', getCards);
initCardRoutes.post('/', createCard);
initCardRoutes.delete('/:cardId', deleteCard);
initCardRoutes.put('/:cardId/likes', likeCard);
initCardRoutes.delete('/:cardId/likes', dislikeCard);

module.exports = initCardRoutes;
