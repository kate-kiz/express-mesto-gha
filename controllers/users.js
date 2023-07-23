const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
// const {
//   codeSuccess, codeCreated, codeError, handleErrors, messageError,
// } = require('../errors/errors');
const { handleErrors } = require('../errors/errors');

const { JWT_SECRET = 'test-secret' } = process.env;

const getUsers = (req, res) => {
  User.find({})
    // .then((results) => res.status(codeSuccess.OK).send({ data: results }))
    .then((results) => res.send({ data: results }))
    .catch((error) => handleErrors(res, error));
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new Error('UserNotFound');
      } else {
        res.send({ data: user });
      }
    })
    .catch((error) => handleErrors(res, error));
};

const getUserInfo = (req, res) => {
  const id = req.user._id;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new Error('UserNotFound');
      } else {
        res.send(user);
      }
    })
    .catch((error) => handleErrors(res, error));
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({
      name: user.name, about: user.about, avatar: user.avatar, email: user.email,
    }))
    .catch((error) => handleErrors(res, error));
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            const token = jwt.sign(
              { _id: user._id },
              JWT_SECRET,
              { expiresIn: '7d' },
            );
            res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true })
              .send({ data: { name: user.name, about: user.about, _id: user._id } });
          } else {
            throw new Error('NotData');
          }
        })
        .catch((error) => handleErrors(res, error));
    });
};

const updateAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new Error('UserNotFound');
      } else {
        res.send({ data: user });
      }
    })
    .catch((error) => handleErrors(res, error));
};

const updateProfile = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new Error('UserNotFound');
      } else {
        res.send({ data: user });
      }
    })
    .catch((error) => handleErrors(res, error));
};

module.exports = {
  getUsers, createUser, getUserById, getUserInfo, updateAvatar, updateProfile, login,
};
