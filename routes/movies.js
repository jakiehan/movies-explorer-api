const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

const { movies, moviesId } = require('../middlewares/joiValidation');

router.get('/movies', getMovies);
router.post('/movies', movies, createMovie);
router.delete('/movies/:movieId', moviesId, deleteMovie);

module.exports = router;
