const initCardRoutes = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { cardValidation, cardIdValidation } = require('../middlewares/validation');

initCardRoutes.get('/', getCards);
initCardRoutes.post('/', cardValidation, createCard);
initCardRoutes.delete('/:cardId', cardIdValidation, deleteCard);
initCardRoutes.put('/:cardId/likes', cardIdValidation, likeCard);
initCardRoutes.delete('/:cardId/likes', cardIdValidation, dislikeCard);

module.exports = initCardRoutes;
