const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Conflict = require('../errors/Conflict');

const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { name, _id } = user;
      const token = jwt.sign({ _id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-movie', { expiresIn: '7d' });
      return res.send({
        name, email, token,
      });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Conflict('пользователь с таким email уже существует');
      }
      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          email, password: hash, name,
        }))
        .then((newUser) => {
          User.findById(newUser._id)
            .select('-password')
            .then((u) => res.send(u));
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = { login, createUser };
