const HTTP_STATUS_BAD_REQUEST = Number(400);
const HTTP_STATUS_FORBIDDEN = 403;
const HTTP_STATUS_NOT_FOUND = 404;
const HTTP_STAUS_UNAUTHORIZED = 401;
const HTTP_STATUS_CONFLICT = 409;
const HTTP_STATUS_SERVER_ERROR = 500;
const URL_REGEX = /(http|https):\/\/(\w+:{0,1}\w*#)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&amp;%#!\-/]))?/;

module.exports = {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STAUS_UNAUTHORIZED,
  HTTP_STATUS_CONFLICT,
  HTTP_STATUS_SERVER_ERROR,
  URL_REGEX,
};
