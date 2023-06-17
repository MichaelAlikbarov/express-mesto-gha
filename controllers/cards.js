const Card = require('../models/card');
const {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_SERVER_ERROR,
} = require('../utils/constant');

const getCards = (req, res) => Card.find({})
  .then((cards) => res.send(cards))
  .catch(() => res.status(HTTP_STATUS_SERVER_ERROR).send({ message: 'Server Error' }));

const createCard = (req, res) => {
  const { name, link, likes } = req.body;
  const owner = req.user._id;

  Card.create({
    name, link, owner, likes,
  })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(HTTP_STATUS_BAD_REQUEST).send({
          message: `${Object.values(err.errors)
            .map(() => err.message).join(', ')}`,
        });
      }
      return res.status(HTTP_STATUS_SERVER_ERROR).send({ message: 'Server Error' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Error: not found' });
      }
      if (err.name === 'CastError') {
        return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Error: bad request' });
      } return res.status(HTTP_STATUS_SERVER_ERROR).send({ message: 'Server Error' });
    });
};

const putCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Error: not found' });
      }
      if (err.name === 'CastError') {
        return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Error: bad request' });
      } return res.status(HTTP_STATUS_SERVER_ERROR).send({ message: 'Server Error' });
    });
};

const deleteCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Error: not found' });
      }
      if (err.name === 'CastError') {
        return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Error: bad request' });
      } return res.status(HTTP_STATUS_SERVER_ERROR).send({ message: 'Server Error' });
    });
};

module.exports = {
  createCard, getCards, deleteCard, putCardLike, deleteCardLike,
};
