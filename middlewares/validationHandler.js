const { celebrate, Joi } = require('celebrate');
const { URL_REGEX } = require('../utils/constant');

const validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(URL_REGEX),
  }),
});

const validationDeleteCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().required().length(24),
  }),
});

const validationGetUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

const validationCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(URL_REGEX),
  }),
});

const validationUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validationUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(URL_REGEX),
  }),
});

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports = {
  validationCreateCard,
  validationDeleteCard,
  validationGetUserId,
  validationCreateUser,
  validationUpdateProfile,
  validationUpdateAvatar,
  validationLogin,
};
