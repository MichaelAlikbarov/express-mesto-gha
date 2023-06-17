const routerCard = require('express').Router();
const {
  getCards, createCard, deleteCard, putCardLike, deleteCardLike,
} = require('../controllers/cards');

routerCard.get('/', getCards);
routerCard.post('/', createCard);
routerCard.delete('/:cardId', deleteCard);

routerCard.put('/:cardId/likes', putCardLike);
routerCard.delete('/:cardId/likes', deleteCardLike);

module.exports = routerCard;
