const User = require('../models/user');
const {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_SERVER_ERROR,
} = require('../utils/constant');

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch(() => res.status(HTTP_STATUS_SERVER_ERROR).send({ message: 'Server Error' }));

const getUserId = (req, res) => {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'User not found ' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Error: bad request' });
      } return res.status(HTTP_STATUS_SERVER_ERROR).send({ message: 'Server Error' });
    });
};

const createUser = ((req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(HTTP_STATUS_BAD_REQUEST).send({
          message: `${Object.values(err.errors)
            .map(() => err.message).join(', ')}`,
        });
      }
      return res.status(HTTP_STATUS_SERVER_ERROR).send({ message: 'Server Error' });
    });
});

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
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

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
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

module.exports = {
  getUsers,
  getUserId,
  createUser,
  updateProfile,
  updateAvatar,
};
