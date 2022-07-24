const User = require('../models/user');
const { checkData } = require('../middlewares/errors');

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
    .catch(next);
};

module.exports = { currentUser, setUserInfo };
