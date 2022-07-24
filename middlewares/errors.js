const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Unauthorized = require('../errors/Unauthorized');
const Forbidden = require('../errors/Forbidden');
const Conflict = require('../errors/Conflict');

const { codeStatus } = require('../utils/constants');

const { INTERNAL_SERVER_ERROR } = codeStatus;

const handleTypeError = (err) => {
  switch (err.name) {
    case 'NotFound':
      return new NotFound(`Запрашиваемый ресурс не найден: ${err.message}`);
    case 'BadRequest':
    case 'CastError':
    case 'ValidationError':
      return new BadRequest(`Некорректные данные: ${err.message}`);
    case 'Unauthorized':
      return new Unauthorized(`Ошибка: ${err.message}`);
    case 'Forbidden':
      return new Forbidden(`Нет прав на совершение операции: ${err.message}`);
    case 'Conflict':
      return new Conflict(`Ошибка: ${err.message}`);
    default:
      return err;
  }
};

const checkData = (res, data) => {
  if (!data) {
    throw new NotFound('Not Found');
  }
  return res.send(data);
};

const handleDeleteMovie = (movie, id) => {
  if (!movie) {
    throw new NotFound('Такого фильма нет');
  }
  if (movie.owner.toHexString() !== id) {
    throw new Forbidden('Вы не можете удалить чужой фильм');
  }
  return movie;
};

const handleError = ((err, req, res, next) => {
  const error = handleTypeError(err);
  const { statusCode = INTERNAL_SERVER_ERROR, message } = error;
  res.status(statusCode).send({ message: statusCode === INTERNAL_SERVER_ERROR ? 'На сервере произошла ошибка' : message });
  next();
});

module.exports = {
  checkData,
  handleDeleteMovie,
  handleError,
};
