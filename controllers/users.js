const User = require('../models/user');

module.exports.getUsers = () => User.find({});

module.exports.getUserById = (userId) => User.findById(userId);

module.exports.createUser = ({ name, about, avatar }) => User.create({ name, about, avatar });

module.exports.updateAvatar = (userId, avatar) => (
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
);

module.exports.updateProfile = (userId, name, about) => (
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
);
