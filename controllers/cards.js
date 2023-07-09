const Card = require('../models/card');

module.exports.getCards = () => Card.find({});

module.exports.createCard = ({ name, link, userId }) => Card.create({ name, link, owner: userId });

module.exports.deleteCard = (cardId) => Card.findByIdAndRemove(cardId);

module.exports.likeCard = (cardId, user) => (
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: user._id } }, { new: true })
);

module.exports.dislikeCard = (cardId, user) => (
  Card.findByIdAndUpdate(cardId, { $pull: { likes: user._id } }, { new: true })
);
