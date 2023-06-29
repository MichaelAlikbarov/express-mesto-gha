const { celebrate, Joi } = require('celebrate');

const validationCreateCard = celebrate({
  // params: Joi.object.keys({}),
  // headers: Joi.object.keys({}),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/(http|https):\/\/(\w+:{0,1}\w*#)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&amp;%#!\-/]))?/),
  }),
});

const validationUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
});

module.exports = {
  validationCreateCard,
  validationUpdateAvatar,
};
