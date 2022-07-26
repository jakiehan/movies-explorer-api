const { celebrate, Joi } = require('celebrate');

const validator = require('validator');

const checkUrl = (url, msg) => {
  if (validator.isURL(url)) {
    return url;
  }
  return msg.message('Передан некорректный URL');
};

const signin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const usersMe = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
});

const movies = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(((value, helpers) => checkUrl(value, helpers))),
    trailerLink: Joi.string().required().custom(((value, helpers) => checkUrl(value, helpers))),
    thumbnail: Joi.string().required().custom(((value, helpers) => checkUrl(value, helpers))),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const moviesId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  signin,
  signup,
  usersMe,
  movies,
  moviesId,
};
