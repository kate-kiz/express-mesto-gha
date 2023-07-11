const User = require('../models/user');
const {
  codeSuccess, codeCreated, codeError, messageError, handleErrors,
} = require('../errors/errors');

// module.exports.getUsers = () => User.find({});

// module.exports.getUserById = (userId) => User.findById(userId);

// module.exports.createUser = ({ name, about, avatar }) => User.create({ name, about, avatar });

// module.exports.updateAvatar = (userId, avatar) => (
//   User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
// );

// module.exports.updateProfile = (userId, name, about) => (
//   User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
// );

const getUsers = (req, res) => {
  User.find({})
    .then((results) => res.status(codeSuccess.OK).send({ data: results }))
    .catch(() => res.status(codeError.SERVER_ERROR).send({ message: messageError.defaultError }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(codeError.NOT_FOUND).send({ message: messageError.notFoundError });
      } else {
        res.send({ data: user });
      }
    })
    .catch((error) => handleErrors(res, error));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(codeCreated.OK).send({ data: user }))
    .catch((error) => handleErrors(res, error));
};

const updateAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(codeError.NOT_FOUND).send({ message: messageError.notFoundError });
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
        res.status(codeError.NOT_FOUND).send({ message: messageError.notFoundError });
      } else {
        res.send({ data: user });
      }
    })
    .catch((error) => handleErrors(res, error));
};

module.exports = {
  getUsers, createUser, getUserById, updateAvatar, updateProfile,
};
