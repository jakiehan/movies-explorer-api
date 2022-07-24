const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFound = require('../errors/NotFound');
const { signin, signup } = require('../middlewares/joiValidation');

const { login, createUser } = require('../controllers/auth');
const auth = require('../middlewares/auth');

router.post('/signin', signin, login);
router.post('/signup', signup, createUser);

router.use(auth);

router.use('/', userRouter);
router.use('/', movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFound('Not Found'));
});

module.exports = router;
