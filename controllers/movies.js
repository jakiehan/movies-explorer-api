const Movie = require('../models/movie');
const { handleDeleteMovie } = require('../middlewares/errors');

const getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((cards) => res.send(cards))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const { _id } = req.user;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: _id,
  })
    .then((movie) => {
      Movie.findById(movie._id)
        .populate('owner')
        .then((m) => res.send(m));
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { _id } = req.user;
  Movie.findById(movieId)
    .then((movie) => handleDeleteMovie(movie, _id))
    .then((movie) => {
      movie.remove()
        .then(() => {
          res.send({ message: 'Фильм удален из вашей коллекции' });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = { getMovies, createMovie, deleteMovie };
