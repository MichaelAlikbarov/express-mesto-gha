const routerCard = require('express').Router();
const {
  getCards, createCard, deleteCard, putCardLike, deleteCardLike,
} = require('../controllers/cards');
const auth = require('../middlewares/auth');
const {
  validationCreateCard,
  validationDeleteCard,
} = require('../middlewares/validationHandler');

routerCard.get('/', auth, getCards);
routerCard.post('/', auth, validationCreateCard, createCard);
routerCard.delete('/:cardId', auth, validationDeleteCard, deleteCard);

routerCard.put('/:cardId/likes', auth, putCardLike);
routerCard.delete('/:cardId/likes', auth, deleteCardLike);

module.exports = routerCard;
