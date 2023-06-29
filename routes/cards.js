const routerCard = require('express').Router();
const {
  getCards, createCard, deleteCard, putCardLike, deleteCardLike,
} = require('../controllers/cards');
const {
  validationCreateCard,
  validationDeleteCard,
} = require('../middlewares/validationHandler');

routerCard.get('/', getCards);
routerCard.post('/', validationCreateCard, createCard);
routerCard.delete('/:cardId', validationDeleteCard, deleteCard);

routerCard.put('/:cardId/likes', validationDeleteCard, putCardLike);
routerCard.delete('/:cardId/likes', validationDeleteCard, deleteCardLike);

module.exports = routerCard;
