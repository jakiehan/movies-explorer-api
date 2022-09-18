const User = require('../models/user');
const { checkData } = require('../middlewares/errors');
const Conflict = require('../errors/Conflict');

const currentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => checkData(res, user))
    .catch(next);
};

const setUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { email, name }, {
    new: true,
    runValidators: true,
  })
    .then((user) => checkData(res, user))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new Conflict('пользователь с таким email уже существует'));
      }
      return next(err);
    });
};

module.exports = { currentUser, setUserInfo };
