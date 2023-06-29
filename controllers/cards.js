const Card = require('../models/card');
const {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_SERVER_ERROR,
} = require('../utils/constant');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const NotFoundError = require('../errors/not-found-error');

const getCards = (req, res) => Card.find({})
  .then((cards) => res.send(cards))
  .catch(() => res.status(HTTP_STATUS_SERVER_ERROR).send({ message: 'Server Error' }));

const createCard = (req, res) => {
  const { name, link, likes } = req.body;
  const owner = req.user;

  Card.create({
    name, link, owner, likes,
  })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(HTTP_STATUS_BAD_REQUEST).next(
          new BadRequestError()`${Object.values(err.errors)
            .map(() => err.message).join(', ')}`,
        );
      }
      return res.status(HTTP_STATUS_SERVER_ERROR).send({ message: 'Server Error' });
    });
};

const deleteCard = (req, res, next) => {
  const cardForDel = Card.findById(
    req.params.cardId,
  )
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => {
      if (req.user === card.owner.valueOf()) {
        card.deleteOne({ cardForDel });
      } else {
        throw new ConflictError('Не трогай чужую карточку');
      }
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return next(new NotFoundError('Error: not found'));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError('Error: bad request'));
      } return res.status(HTTP_STATUS_SERVER_ERROR).send({ message: 'Server Error' });
    });
};

const putCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return next(new NotFoundError('Error: not found'));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError('Error: bad request'));
      } return res.status(HTTP_STATUS_SERVER_ERROR).send({ message: 'Server Error' });
    });
};

const deleteCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user.id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return next(new NotFoundError('Error: not found'));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError('Error: bad request'));
      } return res.status(HTTP_STATUS_SERVER_ERROR).send({ message: 'Server Error' });
    });
};

module.exports = {
  createCard, getCards, deleteCard, putCardLike, deleteCardLike,
};
