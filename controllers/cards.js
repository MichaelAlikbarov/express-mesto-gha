const Card = require('../models/card');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const NotFoundError = require('../errors/not-found-error');

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  const { name, link, likes } = req.body;
  const owner = req.user;

  Card.create({
    name, link, owner, likes,
  })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new BadRequestError()`${Object.values(err.errors)
            .map(() => err.message).join(', ')}`,
        );
      }
    })
    .catch(next);
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
      } next(err);
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
      } next(err);
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
      } next(err);
    });
};

module.exports = {
  createCard, getCards, deleteCard, putCardLike, deleteCardLike,
};
